import React from "react";
import { useState } from "react";
import { Provider as StoreProvider } from "reto";
import { SongService } from "../services/song.service";
import { RequestParams } from "../core/http";
import { Media } from "../shared/utils/media";
import { zip } from "rxjs";

const media = new Media();
const songService = new SongService();

export function AudioStore() {
  const [music, _updateMusic] = useState();
  /**
   * 播放音乐
   * @param id
   */
  const play = (id: number, br = 320000) => {
    if (music && music.id === id) {
      return;
    }

    zip(_getMusicUrl(id, br), _getMusicDetail(id)).subscribe(
      ([urlResult, musicResult]) => {
        const {
          data: [urlData]
        } = urlResult;
        // 播放音乐
        media.play(urlData.url);

        const {
          songs: [musicData]
        } = musicResult;
        // 更新当前播放音乐
        _updateMusic(musicData);
      }
    );
  };

  const _getMusicUrl = (id, br) => {
    return songService.getSongUrl(new RequestParams({ id, br }));
  };

  const _getMusicDetail = id => {
    return songService.getSongDetail(new RequestParams({ ids: [id] }));
  };

  return {
    music,
    play,
    media
  };
}

export const AudioStoreProvider = props => {
  return <StoreProvider of={AudioStore}>{props.children}</StoreProvider>;
};
