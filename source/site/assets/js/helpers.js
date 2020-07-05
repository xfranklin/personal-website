function swapItems(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}

function getTranslate(item) {
  const transArr = [];
  if (!window.getComputedStyle && item) return;
  var style = window.getComputedStyle(item),
  transform = style.transform || style.webkitTransform || style.mozTransform || style.msTransform;
  var mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : transArr.push(0);
  mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : transArr.push(0);
  return transArr;
}

function pause(millis) {
  return new Promise(resolve => {
    setTimeout(()=>{resolve()},millis);
  })
}

function randomArray(len) {
  return Array.from((new Array(len)).keys())
    .map(i=>++i)
    .sort(() => 0.5 - Math.random());
}