/**
 * 转换数字单位
 * @param num
 */
export function tenThoursand(num?: number | string): string {
  if (!num) return "";

  try {
    const n = typeof num === "number" ? num : Number.parseInt(num);
    let str = n > 10000 ? (n / 10000).toFixed(0) + "万" : n.toFixed(0);
    return str;
  } catch (error) {
    return num.toString();
  }
}

/**
 * 日期格式化
 * @param date
 * @param fmt 默认值为短日期格式
 */
export function dateFormat(date, fmt = "yyyy-MM-dd"): string {
  // 空数据处理
  if (date === null || date === undefined || date === "") {
    return "";
  }

  // 如果是时间戳则转化为时间
  if (typeof date === "number") {
    date = new Date(date);
  }

  let o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };

  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
}
