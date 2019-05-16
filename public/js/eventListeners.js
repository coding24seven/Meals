function applyEventListeners() {
  /// viewport resized
  window.addEventListener('resize', function () {
    // update browser viewport, font size, etc.
    state.browser = getBrowserState();

    // is full header being displayed? TRUE OR FALSE
    state.fullHeaderText = state.browser.viewportWidth > bp_header ? true : false;

    switchLanguage();
  });


  /// all clickable language labels such as country flags
  const allLanguageLabels = document.querySelectorAll(".language__label");
  allLanguageLabels.forEach(label => {
    label.addEventListener("click", () => {
      // give a radio button time to toggle before you check which one is checked now
      setTimeout(() => { switchLanguage(); }, 1);
    });
  });
}
