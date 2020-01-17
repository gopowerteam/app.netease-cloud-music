export interface RankType {
  name: string;
  value: string;
  id?: number;
  type?: string;
}

export const RankTypeConfig: RankType[] = [
  { value: "0", name: "云音乐新歌榜", id: 3779629, type: "L" },
  { value: "1", name: "云音乐热歌榜", id: 3778678, type: "L" },
  { value: "2", name: "网易原创歌曲榜", id: 2884035, type: "L" },
  { value: "3", name: "云音乐飙升榜", id: 19723756, type: "L" },
  { value: "4", name: "云音乐电音榜", id: 1978921795 },
  { value: "5", name: "UK排行榜周榜", id: 180106 },
  { value: "6", name: "美国Billboard周榜", id: 60198 },
  { value: "7", name: "KTV嗨榜", id: 21845217 },
  { value: "8", name: "iTunes榜", id: 11641012 },
  { value: "9", name: "Hit FM Top榜", id: 120001 },
  { value: "10", name: "日本Oricon周榜", id: 60131 },
  { value: "11", name: "韩国Melon排行榜周榜" },
  { value: "12", name: "韩国Mnet排行榜周榜" },
  { value: "13", name: "韩国Melon原声周榜" },
  { value: "14", name: "中国TOP排行榜(港台榜)" },
  { value: "15", name: "中国TOP排行榜(内地榜)" },
  { value: "16", name: "香港电台中文龙虎榜" },
  { value: "17", name: "华语金曲榜" },
  { value: "18", name: "中国嘻哈榜" },
  { value: "19", name: "法国 NRJ EuroHot 30周榜", id: 27135204 },
  { value: "20", name: "台湾Hito排行榜", id: 112463 },
  { value: "21", name: "Beatport全球电子舞曲榜", id: 3812895 },
  { value: "22", name: "云音乐ACG音乐榜", id: 3001835560 },
  { value: "23", name: "云音乐说唱榜", id: 991319590 },
  { value: "24", name: "云音乐古典音乐榜", id: 71384707 },
  { value: "25", name: "云音乐电音榜", id: 1978921795 },
  { value: "26", name: "抖音排行榜", id: 2250011882 },
  { value: "27", name: "新声榜", id: 2617766278 },
  { value: "28", name: "云音乐韩语榜", id: 745956260 },
  { value: "29", name: "英国Q杂志中文版周榜", id: 2023401535 },
  { value: "30", name: "电竞音乐榜", id: 2006508653 },
  { value: "31", name: "云音乐欧美热歌榜", id: 2809513713 },
  { value: "32", name: "云音乐欧美新歌榜", id: 2809577409 },
  { value: "33", name: "说唱TOP榜", id: 991319590 }
];
