/*
* rotates an image by 90 degrees
*/

export default function rotateImage(cbRunner, cbIndex) {
  const uploadableImage = cbRunner[0];
  const degrees = 90;

  const image = new Image();
  image.onload = function () {

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = image.height;
    canvas.height = image.width;
    context.translate(image.height / 2, image.width / 2);

    context.rotate(degrees * Math.PI / 180);
    context.drawImage(image, -image.width / 2, -image.height / 2);

    // update the image object with new DataURL content
    uploadableImage.setContentAsDataURL(canvas.toDataURL(uploadableImage.type, uploadableImage.jpgQuality));

    uploadableImage.rotationCounter++;

    // if the image is back at the original rotation (rotationCounter === 4), go back and re-process the original image. otherwise keep working on the same image.
    cbRunner[uploadableImage.rotationCounter === 4 ? [1] : cbIndex]();

  }
  image.src = uploadableImage.getContentAsDataURL();
}
