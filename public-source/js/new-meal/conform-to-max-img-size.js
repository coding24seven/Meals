/*
* reduce the image size if it exceeds max allowed size. commit new image to state.
*/

export default function conformToMaxImgSize(cbRunner, cbIndex) {

  const uploadableImage = cbRunner[0];

  // do not reduce the image quality if its size does not exceed maxSize
  if (uploadableImage.sizeOfOutputFile <= uploadableImage.maxSize) {
    cbRunner[cbIndex]();
    return;
  }
  const image = new Image();
  image.onload = function (imageEvent) {

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0);

    uploadableImage.setContentAsDataURL(
      canvas.toDataURL(uploadableImage.type, uploadableImage.jpgQuality)
    );

    console.log("outgoing-jpg quality:", uploadableImage.jpgQuality)
    console.log("outgoing-jpg size:", uploadableImage.sizeOfOutputFile)

    cbRunner[cbIndex]();
  }
  image.src = uploadableImage.getContentAsDataURL();
}
