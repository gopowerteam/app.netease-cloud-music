import { AudioCenter } from "./audio-center";

export enum AudioState {
  none = "none",
  running = "running",
  pause = "pause",
  ready = "ready",
  loading = "loading"
}

export class AudioMedia {
  private source?: AudioBufferSourceNode;
  private readonly audioContext: AudioContext;
  private readonly gainNode: GainNode;
  private _state = AudioState.loading;
  private stoping = false;
  public duration!: number;
  public offset = 0;
  private startedAt!: number;
  private pausedAt!: number;
  private buffer;
  private volumn = 1;

  public get state() {
    return this._state;
  }

  public set state(value) {
    this._state = value;
    this.emitStateChange();
  }

  // 状态变更监听列表
  private stateChangeListener: Function[] = [];

  constructor(private audioCenter: AudioCenter) {
    this.audioContext = this.audioCenter.getAudioContext();
    this.gainNode = this.audioCenter.getGainNode();
  }

  /**
   * 加载音频数据
   * @param url
   */
  public async load(url) {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = await this.request(url);
    this.source.connect(this.gainNode);
    this.buffer = this.source.buffer;
    this.duration = this.source.buffer.duration;
    this.state = AudioState.ready;
  }

  /**
   * 音频状态变更监听
   */
  public onStateChange(callback) {
    this.stateChangeListener.push(callback);
  }

  /**
   * 音频状态变更事件
   */
  public emitStateChange() {
    this.stateChangeListener.forEach(callback => callback && callback());
  }

  /**
   * 播放音频
   * @param offset
   */
  public play() {
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }

    if (this.source && this.state === AudioState.ready) {
      this.source.start();
      this.startedAt = this.audioContext.currentTime;
      this.state = AudioState.running;
    }
  }

  public setOffset(offset) {
    if (!this.source) {
      return;
    }

    const source = this.source;
    source.disconnect();
    source.stop();
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.startedAt = this.audioContext.currentTime;
    this.source.start(this.audioContext.currentTime, offset);
    this.offset = offset;

    if (this.state !== AudioState.running) {
      this.pause();
    }
  }

  public getOffset() {
    if (this.startedAt) {
      return this.offset + (this.audioContext.currentTime - this.startedAt);
    } else {
      return 0;
    }
  }

  /**
   * 暂停音频播放
   */
  public pause() {
    if (this.audioContext.state === "running") {
      this.audioContext.suspend();
      this.pausedAt = this.audioContext.currentTime;
      this.offset = this.offset + (this.pausedAt - this.startedAt);
      this.state = AudioState.pause;
    }
  }

  /**
   * 恢复音频播放
   */
  public resume() {
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
      this.startedAt = this.audioContext.currentTime;
      this.state = AudioState.running;
    }
  }

  public getVolumn() {
    return Math.floor(this.volumn * 100);
  }

  public setVolumn(volumn) {
    this.volumn = volumn / 100;
    this.gainNode.gain.value = this.volumn;
  }

  /**
   * 断开音频链接
   */
  public disconnect() {
    if (this.source && this.stoping === false) {
      this.stoping = true;
      this.source.disconnect();
      this.state === AudioState.running && this.source.stop();
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
