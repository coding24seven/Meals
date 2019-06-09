/*
* convert a possible non-jpg image to jpg
*/

export default function convertToJpg(uploadableImage, cb) {

  if (uploadableImage.type === "image/jpeg") {
    cb(uploadableImage);
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

    cb(uploadableImage);
  }
  image.src = uploadableImage.getContentAsDataURL();
}
