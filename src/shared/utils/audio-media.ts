import { AudioCenter } from "./audio-center";

enum MediaState {
  running = "running",
  pause = "pause",
  ready = "ready",
  loading = "loading"
}

export class AudioMedia {
  private source?: AudioBufferSourceNode;
  private readonly audioContext: AudioContext;
  private readonly gainNode: GainNode;
  private state = MediaState.loading;

  constructor(private audioCenter: AudioCenter) {
    this.audioContext = this.audioCenter.getAudioContext();
    this.gainNode = this.audioCenter.getGainNode();
  }

  public async load(url) {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = await this.request(url);
    this.source.connect(this.gainNode);
    this.state = MediaState.ready;
  }

  public play(offset = 0) {
    if (this.source && this.state === MediaState.ready) {
      this.source.start();
      this.state = MediaState.running;
    }
  }

  public pause() {
    if (this.audioContext.state === "running") {
      this.audioContext.suspend();
    }
  }

  public resume() {
    if (this.audioContext.state === "suspended") {
      this.audioContext.suspend();
    }
  }

  public disconnect() {
    if (this.source) {
      this.source.disconnect();
      this.state === MediaState.running && this.source.stop();
    }
  }

  /**
   * 请求音乐数据
   * @param source
   */
  private request(source: string): Promise<AudioBuffer> {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", source, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        this.audioContext.decodeAudioData(xhr.response, buffer => {
          resolve(buffer);
        });
      }; // 请求完成
      xhr.onerror = error => reject(error); // 请求异常
      xhr.ontimeout = () => reject("timeouts"); // 请求超时
      xhr.send();
    });
  }
}
