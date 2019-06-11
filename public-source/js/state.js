import scss_vars from '../sass/_variables.scss'

const state = {

  // is the full header being displayed? TRUE OR FALSE
  headerTextIsFull: function () {
    return this.getBrowserState().viewportWidth > parseFloat(scss_vars.bp_header) ?
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

  // MESSAGE PLACEHOLDER FOR THE MEAL-COOKED TODAY CONFIRM POPUP
  mealCookedConfirmMessage: null,

  // a picked-image object whose resolution has been reduced to the custom max size
  uploadableImage: {}
}

export default state;
export const { uploadableImage } = state;
