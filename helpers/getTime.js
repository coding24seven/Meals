
/// OBTAIN DATE AND TIME IN A STRING FORMAT, FOR EXAMPLE "01/10/2018 22:41:41"
export default function getTime() {
  let t = new Date();
  let hours = t.getHours() < 10 ? '0' + t.getHours().toString() : t.getHours();
  let minutes = t.getMinutes() < 10 ? '0' + t.getMinutes().toString() : t.getMinutes();
  let seconds = t.getSeconds() < 10 ? '0' + t.getSeconds().toString() : t.getSeconds();

  t = hours + ':' + minutes + ':' + seconds;

  return t;
}
