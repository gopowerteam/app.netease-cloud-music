import { AudioMedia } from "./audio-media";

interface MediaOption {
  source: string[];
  loop: boolean;
  volume: number;
  onPlayOver?: Function;
  onPlayEnd?: Function;
  onPlayError?: Function;
}

export class AudioCenter {
  // 音频上下文
  private readonly audioContext: AudioContext;
  private readonly gainNode: GainNode;

  // 音频数据源
  private media: AudioMedia;

  constructor() {
    this.audioContext = new window.AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
  }

  public getAudioContext() {
    return this.audioContext;
  }

  public getGainNode() {
    return this.gainNode;
  }

  /**
   * 播放音乐
   * @param url
   */
  async create(url: string) {
    if (this.media) {
      this.media.disconnect();
    }

    this.media = new AudioMedia(this);
    await this.media.load(url);
    return this.media;
  }

  setOptions() {}

  setLoop(loop) {}

  public get volume() {
    return this.gainNode.gain.value;
  }

  public set volume(value) {
    value = value < 0 ? 0 : value;
    value = value > 1 ? 1 : value;
    this.gainNode.gain.value = value;
  }
}
