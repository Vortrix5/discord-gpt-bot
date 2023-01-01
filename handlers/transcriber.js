/*
 * MIT License
 *
 * Copyright (c) 2022 Amine Zouaoui
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const { EndBehaviorType, VoiceReceiver } = require('@discordjs/voice');
const { pipeline, Readable } = require("stream");
const witClient = require('node-witai-speech');
const prism = require("prism-media");
const util = require('util');
const fs = require("fs");

class Transcriber {
  constructor(apiKey) {
    this.WITAPIKEY = apiKey;
    this.witAI_lastcallTS = null;

    return this;
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async convert_audio(input) {
    try {
      // stereo to mono channel
      const data = new Int16Array(input)
      const ndata = new Int16Array(data.length/2)
      for (let i = 0, j = 0; i < data.length; i+=4) {
        ndata[j++] = data[i]
        ndata[j++] = data[i+1]
      }
      return Buffer.from(ndata);
    } catch (e) {
      console.log('convert_audio: ', e)
      throw e;
    }
  }

  async transcribe(buffer, raw) {
    try {
      if (this.witAI_lastcallTS != null) {
        let now = Math.floor(new Date());
        while (now - this.witAI_lastcallTS < 1000) {
          await this.sleep(100);
          now = Math.floor(new Date());
        }
      }
      const extractSpeechIntent = util.promisify(witClient.extractSpeechIntent);
      var stream = Readable.from(buffer);
      const contenttype = "audio/raw;encoding=signed-integer;bits=16;rate=48k;endian=little"
      var output = await extractSpeechIntent(this.WITAPIKEY, stream, contenttype);
      this.witAI_lastcallTS = Math.floor(new Date());
      if (raw) return output;
      if (typeof output == "object") return output;
      output = output.split("\n").map((item) => item.trim()).join("");
      let idx = output.lastIndexOf("}{");
      let idx0 = output.lastIndexOf("}");
      output = JSON.parse(output.substring(idx + 1, idx0 + 1).trim().replace(/\n/g, "").trim());
      output.text = output.text.replace(/\./g, "");
      stream.destroy();
      return output;
    } catch(e) {
      console.log("Transcriber-error: ", e);
      return {}
    }
  }

  listen(receiver, userId, user) {
    return new Promise(async (res, rej) => {
      const stream = receiver.subscribe(userId, {
    		end: {
    			behavior: EndBehaviorType.AfterSilence,
    			duration: 300,
    		}
      });

      const decoder = new prism.opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 });
      stream.pipe(decoder);

      let buffer = [];
      decoder.on("data", (data) => {
        buffer.push(data);
      });
      decoder.on("end", async () => {
        buffer = Buffer.concat(buffer);
        const duration = buffer.length / 48000 / 2;
        if (duration > 1.0 || duration < 19) {
          let transcript = await this.transcribe(await this.convert_audio(buffer));
          res({user: user, transcript: transcript });
        }
      })
    });
  }
}

module.exports = Transcriber;
