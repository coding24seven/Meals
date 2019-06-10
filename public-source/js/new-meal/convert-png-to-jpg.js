/*
* convert a possible non-jpg image to jpg
*/

export default function convertToJpg(uploadableImage, cbs) {

  const newCBs = cbs.slice(1); // the callback list without the first one

  if (uploadableImage.type === "image/jpeg") {
    cbs[0](uploadableImage, newCBs);
    return;
  }

  const image = new Image();

  // 'onload' fires each time the image is applied via the src attribute
  image.onload = function (imageEvent) {

    // replace the file extension with 'jpg'
    let arr = uploadableImage.name.split('.')
    arr[arr.length - 1] = 'jpg';
    uploadableImage.name = arr.join('.');

    uploadableImage.type = 'image/jpeg';

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0);

    // update the image object with new DataURL content
    uploadableImage.setContentAsDataURL(canvasToImage(canvas, "white", uploadableImage));

    cbs[0](uploadableImage, newCBs);
  }
  image.src = uploadableImage.getContentAsDataURL();
}

function canvasToImage(canvas, backgroundColor, uploadableImage) {

  const context = canvas.getContext('2d');
  canvas = context.canvas;

  // shortcut to height and width
  const w = canvas.width;
  const h = canvas.height;

  // get the current pixel data for a specified portion of the canvas
  const pixelData = context.getImageData(0, 0, w, h);

  // store the current globalCompositeOperation
  const compositeOperation = context.globalCompositeOperation;

  // set to draw behind current content
  context.globalCompositeOperation = "destination-over";

  // set background color
  context.fillStyle = backgroundColor;

  // draw background / rect on entire canvas
  context.fillRect(0, 0, w, h);

  // get the image data from the canvas
  const imageAsDataURL = canvas.toDataURL(uploadableImage.type, 1.0);

  // clear the canvas
  context.clearRect(0, 0, w, h);

  // restore it with original / cached ImageData
  context.putImageData(pixelData, 0, 0);

  // reset the globalCompositeOperation to what it was
  context.globalCompositeOperation = compositeOperation;

  // Return the Base64 encoded data url string
  return imageAsDataURL;
}
