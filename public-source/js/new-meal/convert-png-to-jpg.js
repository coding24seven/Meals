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
    uploadableImage.width = image.width;
    uploadableImage.height = image.height;

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext('2d').drawImage(image, 0, 0);

    // update the image object with new DataURL content
    uploadableImage.setContentAsDataURL(canvas.toDataURL(uploadableImage.type, 1.0));

    cbs[0](uploadableImage, newCBs);
  }
  image.src = uploadableImage.getContentAsDataURL();
}
