import React from "react";
import { useState } from "react";
import { Provider as StoreProvider } from "reto";
import { SongService } from "../services/song.service";
import { RequestParams } from "../core/http";
import { AudioCenter } from "../shared/utils/audio-center";
import { zip } from "rxjs";
import { message } from "antd";
import { AudioState } from "~/shared/utils/audio-media";
const audioCenter = new AudioCenter();
const songService = new SongService();

export function AudioStore() {
  const [audioList, _updateAudioList] = useState();
  const [audio, _updateAudio] = useState();
  const [audioData, _updateAudioData] = useState();
  const [audioState, _updateAudioState] = useState(AudioState.none);

  /**
   * 获取音频地址
   * @param id
   * @param br
   */
  const _getAudioUrl = (id, br) =>
    songService.getSongUrl(new RequestParams({ id, br }));

  /**
   *
   * @param id  获取音频信息
   */
  const _getAudioDetail = id =>
    songService.getSongDetail(new RequestParams({ ids: [id] }));

  /**
   * 更新歌单列表
   * @param playlist
   */
  const updateAudioList = (playlist: any) => {
    if (audioList && audioList.id === playlist.id) {
      return;
    }
    _updateAudioList(playlist);
  };

  /**
   * 下一首音频
   */
  const nextAudio = () => {
    const trackIds = audioList.trackIds;
    const index = trackIds.findIndex(x => x.id === audioData.id);

    if (index < trackIds.length) {
      const target = trackIds[index + 1];
      return updateAudio(target.id);
    } else {
      return Promise.reject();
    }
  };

  /**
   * 上一首音频
   */
  const preAudio = () => {
    const trackIds = audioList.trackIds;
    const index = trackIds.findIndex(x => x.id === audioData.id);

    if (index > 0) {
      const target = trackIds[index - 1];
      return updateAudio(target.id);
    } else {
      return Promise.reject();
    }
  };

  /**
   * 更新当前音乐媒体
   * @param id
   */
  const updateAudio = (id: number, br = 320000) => {
    if (audioData && audioData.id === id) {
      return Promise.resolve(audio);
    }

    return new Promise((resolve, reject) => {
      // 获取音频数据
      zip(_getAudioUrl(id, br), _getAudioDetail(id)).subscribe(
        ([audioUrlResult, audioDataResult]) => {
          // 音频地址信息
          const {
            data: [{ url: audioUrl }]
          } = audioUrlResult;
          // 音频相关信息
          const {
            songs: [audioData]
          } = audioDataResult;

          if (audioUrl) {
            // 更新音乐
            audioCenter.create(audioUrl).then(audio => {
              // 更新音频对象
              _updateAudio(audio);
              // 更新音频数据
              _updateAudioData(audioData);
              // 设置媒体
              setupAudio(audio);
              resolve(audio);
            });
          } else {
            // 无法获取播放地址
            reject();
            message.warn("未获取该音乐版权,无法播放");
          }
        }
      );
    });
  };
  

  const setupAudio = function(audio) {
    // 更新初始状态
    _updateAudioState(audio.state);
    // 更新媒体状态ƒ
    audio.onStateChange(() => {
      _updateAudioState(audio.state);
    });
  };

  return {
    audio,
    audioState,
    audioData,
    updateAudio,
    updateAudioList,
    nextAudio,
    preAudio
  };
}

export const AudioStoreProvider = props => {
  return <StoreProvider of={AudioStore}>{props.children}</StoreProvider>;
};
