import throttle from 'lodash.throttle';
import createMasonryLayout from './masonry';
import eventifyTodayButtonAnimation from './eventify-today-button-animation';
import { screenLoader, headerEl, mealsEl } from '../elements';
import prepareTodayButtons from "./prepare-today-buttons";
import { eventifySearchInput, focusOrUnfocusSearchInput } from './search-input';
import eventifyEditableProperty from './eventify-editable-property';

/// unique page identifier: page-id-meals

/// WHEN THE PAGE MARKUP IS LOADED
document.addEventListener("DOMContentLoaded", function () {

  // abort the function if a mismatching page has been loaded
  if (!document.getElementById('page-id-meals')) return;

  console.log('page-id-meals loaded');

  //. SHOW THE SCREEN LOADER BEFORE IT HIDES ON 'WINDOW.LOAD'
  screenLoader.classList.add('show');

  //. SET UP 'TODAY' BUTTON ON EACH MEAL
  prepareTodayButtons();

  //. SHOW THE SEARCH INPUT ON THIS PAGE AND PREPARE IT
  headerEl.searchInput.value = "";
  headerEl.searchInput.classList.add('show');
  eventifySearchInput();

  //. SET UP EVENTS FOR MEAL NAME AND DATE AND COUNT
  eventifyEditableProperty(mealsEl.allNames, 'name update');
  eventifyEditableProperty(mealsEl.allDateVals, 'date update');
  eventifyEditableProperty(mealsEl.allCountVals, 'count update');

  //. ANY KEY PRESSED FOCUSES SEARCH INPUT IF NO ELEMENT IS BEING EDITED
  document.onkeydown = (e) => {

    // let meal properties be edited without interference from the search input
    if (Array.from(mealsEl.allNames).includes(e.target)
      || Array.from(mealsEl.allDateVals).includes(e.target)
      || Array.from(mealsEl.allCountVals).includes(e.target)) {
      // do nothing
    }
    // delegate the event to the search input
    else { focusOrUnfocusSearchInput(e.keyCode); }
  };

  /// WHEN THE PAGE IS FULLY LOADED
  window.addEventListener('load', function () {

    screenLoader.classList.remove('show');

    // ADD FUNCTIONS THAT WILL ANIMATE THE 'TODAY' BUTTON ON MOUSEENTER AND MOUSELEAVE
    eventifyTodayButtonAnimation();

    // CREATE A MASONRY LAYOUT (IF MORE THAN ONE COLUMN IS DISPLAYED)
    createMasonryLayout();

  }, false)

  /// WHEN THE PAGE IS RESIZED
  window.addEventListener('resize', throttle(function () {

    eventifyTodayButtonAnimation();

    // CREATE A MASONRY LAYOUT (IF MORE THAN ONE COLUMN IS DISPLAYED)
    createMasonryLayout();

  }, 1000), false)

}); // "DOMContentLoaded" ends
