/*
* convert a possible non-jpg image to jpg
*/

export default function convertToJpg(cbRunner, cbIndex) {

  const uploadableImage = cbRunner[0];

  if (uploadableImage.type === "image/jpeg") {
    cbRunner[cbIndex]();
    return;
  }

  const image = new Image();

  // 'onload' fires each time the image is applied via the src attribute
  image.onload = function (imageEvent) {

    // warning: don't forget to replace the file extension with 'jpg' if this function is used outside of the context of this particular app, which handles that in another function

    uploadableImage.type = 'image/jpeg';

    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0);

    canvas = colorCanvasBackground(canvas, "white");

    // update the image object with new DataURL content
    uploadableImage.setContentAsDataURL(canvas.toDataURL(uploadableImage.type, 1.0));

    cbRunner[cbIndex]();
  }
  image.src = uploadableImage.getContentAsDataURL();
}

function colorCanvasBackground(canvas, backgroundColor) {

  const context = canvas.getContext('2d');
  canvas = context.canvas;

  // set to draw behind current content
  context.globalCompositeOperation = "destination-over";

  // set background color
  context.fillStyle = backgroundColor;

  // draw background / rect on entire canvas
  context.fillRect(0, 0, canvas.width, canvas.height);

  return canvas;
}
