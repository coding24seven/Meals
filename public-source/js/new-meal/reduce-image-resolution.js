// reduce the image resolution if it exceeds max resolution. commit new image to state.

import checkImageSizeIsRight from './checkImageSizeIsRight';

export default function reduceImageResolution(uploadableImage) {
  const maxRes = uploadableImage.maxRes;

  // check for previously populated width and height. step out if they exist and are below maxRes
  if (uploadableImage.width && uploadableImage.width <= maxRes
    && uploadableImage.height && uploadableImage.height <= maxRes) {
    checkImageSizeIsRight(uploadableImage);
    return;
  }

  const image = new Image();
  image.onload = function (imageEvent) {
    let w = image.width;
    let h = image.height;

    // check for the real-time width and height. step out if they are below maxRes
    if (w <= maxRes && h <= maxRes) {
      checkImageSizeIsRight(uploadableImage);
      return;
    }

    // if landscape
    if (w > h) {
      if (w > maxRes) {
        h *= maxRes / w;
        w = maxRes;
      }
    }
    // if portrait or square
    else {
      if (h > maxRes) {
        w *= maxRes / h;
        h = maxRes;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(image, 0, 0, w, h);

    // update the image object with new DataURL content
    uploadableImage.setContentAsDataURL(canvas.toDataURL(uploadableImage.type, 1.0));
    checkImageSizeIsRight(uploadableImage);
    return;
  }
  image.src = uploadableImage.getContentAsDataURL();
}
