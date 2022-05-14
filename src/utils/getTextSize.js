export function getTextSize (text, parent = document.body) {
  const computedStyle = window.getComputedStyle(parent);
  const node = document.createElement("span");
  const style = Array
    .from(computedStyle)
    .filter(el => el.startsWith("font"))
    .reduce((obj, value) => {
      obj[value] = computedStyle.getPropertyValue(value);
      
      return obj;
    }, {});
  
  Object.assign(node.style, style, {
    top: "-100000rem",
    left: "-100000rem",
    position: "absolute",
    visibility: "hidden"
  });
  
  node.appendChild(document.createTextNode(text));
  
  document.body.appendChild(node);
  const size = node.offsetWidth;
  document.body.removeChild(node);
  
  return size;
}
