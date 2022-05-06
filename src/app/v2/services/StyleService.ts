export function getTileStyle(
  width: number,
  height: number,
  isRotated: boolean
): any {
  const sidePadding = (height - width) / 2 + 1;
  return isRotated
    ? {
        transform: "rotate(-90deg)",
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: sidePadding,
        paddingRight: sidePadding,
      }
    : {
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: sidePadding,
        paddingRight: sidePadding,
      };
}
