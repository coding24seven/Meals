function State() {
  // store browser viewport, font size, etc.
  this.browser = getBrowserState();

  // is full header being displayed? TRUE OR FALSE
  this.fullHeaderText = this.browser.viewportWidth > bp_header ? true : false;

  // MESSAGE FOR MEAL COOKED CONFIRM POPUP
  this.mealCookedConfirmMessage;
}

const state = new State();