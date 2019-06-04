import vars from './variables'

const state = {

  // is the full header being displayed? TRUE OR FALSE
  isHeaderTextFull: function () {
    return this.getBrowserState().viewportWidth > vars.bp_header ?
      true : false;
  },

  // get browser viewport width in 'em' unit, font size in 'px' unit
  getBrowserState: function () {

    const fontSize = 1.6 * parseFloat(getComputedStyle(document.querySelector('html'))['font-size']);

    const viewportWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / fontSize;

    return {
      fontSize, // px
      viewportWidth // em
    }
  },

  // MESSAGE PLACEHOLDER FOR THE MEAL-COOKED CONFIRM POPUP
  mealCookedConfirmMessage: null,

  // WHETHER OR NOT THE NEW-MEAL USER-SELECTED IMAGE IS VALID AND READY FOR UPLOAD
  imageIsReadyForUpload: false,

  pickedImagePath: null
}

export default state
