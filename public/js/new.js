document.addEventListener("DOMContentLoaded", function () {

  /// MULTER FILE UPLOAD
  document.getElementById('file').addEventListener('change', handleFileSelect, false);

  function handleFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        document.getElementById('list').innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="100%" />'].join('');
      };
    })(f);
    reader.readAsDataURL(f);

    // once the photo has been chosen, reveal the hidden submit button
    elements.submitMealButton.style.display = "block";
  }
  ///
});
