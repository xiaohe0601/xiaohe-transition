/**
 * 帧率转毫秒
 *
 * @param fps   帧率
 * @returns     毫秒
 */
export function fps2ms(fps: number): number {
  if (fps === 0) {
    return 0;
  }

  return 1000 / fps;
}