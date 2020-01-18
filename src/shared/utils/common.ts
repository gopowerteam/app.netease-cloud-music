
export function convertPlayCount(count) {
  if (count > 10000) {
    return `${Math.floor(count / 10000)}万`;
  } else {
    return count;
  }
}
