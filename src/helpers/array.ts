/**
 * 
 * @param originalArray Array with posible duplicate
 * @param props Array object keys. Take with Object.keys(originalArray[0]) or add manually
 * @returns 
 */
export function removeDuplicates(
  originalArray: Array<any>,
  props: Array<string>
) {
  return originalArray.filter(
    (obj, index: number, self) =>
      index ===
      self.findIndex((t) => props.every((prop) => t[prop] === obj[prop]))
  );
}
