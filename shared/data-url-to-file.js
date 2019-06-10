/*
* converts dataURL to a file object
*/

export default function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]); // convert base64 encoding to binary
  let n = bstr.length
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
