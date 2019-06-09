/*
* reduce the image size if it exceeds max allowed size. commit new image to state.
*/

export default function checkImageSizeIsRight(uploadableImage) {

  // do not reduce the image quality if its size does not exceed maxSize
  if (uploadableImage.sizeOfOutputFile <= uploadableImage.maxSize) return;

  const image = new Image();
  image.onload = function (imageEvent) {

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0);

    uploadableImage.setContentAsDataURL(
      canvas.toDataURL(uploadableImage.type, uploadableImage.jpgQuality)
    );

    console.log("jpgQuality:", uploadableImage.jpgQuality)
    console.log("file size:", uploadableImage.sizeOfOutputFile)
    console.log("")

  }
  image.src = uploadableImage.getContentAsDataURL();
}
