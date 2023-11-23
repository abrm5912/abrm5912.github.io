export function getUniqueOptionsByProperty<T, K extends keyof T> (arr: T[], property: K) {
  const ccyList = arr.map((item: T) => item[property]);
  const ccySet = new Set(ccyList);
  return Array.from(ccySet).map((item) => ({ value: item, label: item }));
}
