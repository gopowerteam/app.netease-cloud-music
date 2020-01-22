
interface MediaOption {
  source: string[],
  loop: boolean,
  volume: number,
  onPlayOver?: Function,
  onPlayEnd?: Function,
  onPlayError?: Function
}


export class Media {
  // 音频上下文
  private readonly audioContext: AudioContext
  // 音频数据源
  private source: AudioBufferSourceNode

  constructor() {
    this.audioContext = new window.AudioContext()
    this.audioContext.suspend()
  }

  /**
   * 播放音乐
   * @param url 
   */
  play(url: string) {
    if (this.audioContext.state !== "running") {
      this.audioContext.resume()
    }
    if (this.source) {
      console.log(this.source)
      this.source.stop()
      this.source.onended = null
      this.source.disconnect()
    }

    this.request(url)
      .then(response => this.decodeAudioData(response))
      .then(() => this.start(0))
      .catch(err => {
        // 播放异常回调
        // const { onPlayError } = this.options
        // onPlayError && onPlayError(err)
      })
  }



  public puase() {
    this.audioContext.suspend()
  }

  public resume() {
    this.audioContext.resume()
  }

  /**
   * 请求音乐数据
   * @param source 
   */
  request(source: string) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', source, true)
      xhr.responseType = 'arraybuffer'
      // 请求完成
      xhr.onload = () => resolve(xhr.response)
      // 请求异常
      xhr.onerror = (error) => reject(error)
      // 请求超时
      xhr.ontimeout = () => reject('timeouts')
      xhr.send()
    })
  }

  /**
   * 解析音乐数据
   * @param response 
   */
  decodeAudioData(response) {
    return this.audioContext.decodeAudioData(response)
      .then(buffer => {
        this.setBufferSource(buffer)
      })
  }

  /**
   * 设置播放数据源
   * @param buffer 
   */
  setBufferSource(buffer: AudioBuffer) {
    this.source = this.audioContext.createBufferSource()
    this.source.connect(this.audioContext.destination); // 连接到输出源
    this.source.buffer = buffer

  }

  setOptions() {
    // let { loop, volume } = this.options
    // if (loop != null) this.setLoop(loop)
    // if (volume != null) this.setVolume()
  }

  setLoop(loop) {
    // if (typeof loop !== 'boolean') throw new Error('expected parameter is boolean type')
    // this.bufferSource.loop = loop
    // this.options.loop = loop
  }
  s
  /**
   * @param {number} val 设置音量
   */
  setVolume(val = 1) {
    // if (val >= 0 && val <= 1) {
    //   this.gain.gain.value = val //** 2
    //   this.options.volume = val
    //   return
    // }
    // throw new Error('value is out of range and expected range from 0 to 1')
  }



  start(offset) {
    this.source.start(0)
  }
}