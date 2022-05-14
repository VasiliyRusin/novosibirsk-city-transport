export function reverseBinding (o) {
  const reverseO = {};
  for (const [key, value] of Object.entries(o)) {
    reverseO[value] = key;
  }
  
  return Object.assign({}, o, reverseO);
}
