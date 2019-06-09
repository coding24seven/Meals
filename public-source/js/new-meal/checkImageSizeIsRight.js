// reduce the image size if it exceeds max allowed size. commit new image to state.

export default function checkImageSizeIsRight(uploadableImage) {

  // do not reduce the image quality if it does not exceed maxSize
  if (uploadableImage.sizeOfOutputFile <= uploadableImage.maxSize) return;

  const image = new Image();
  image.onload = function (imageEvent) {
    let w = image.width;
    let h = image.height;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(image, 0, 0, w, h);


    const jpgQuality = 0.9;
    uploadableImage.setContentAsDataURL(canvas.toDataURL(uploadableImage.type, jpgQuality));
  }
  image.src = uploadableImage.getContentAsDataURL();
}
