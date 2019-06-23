import state from '../state';
import { headerElement, mealsElement } from '../elements';
import createMasonryLayout from './masonry';
import { eventifySearchMealsInput } from './search-input';

/// CALLED EACH TIME MEAL PROPERTIES MAY HAVE CHANGED
export default function takePropertiesOnBoard() {

  console.log('takePropertiesOnBoard running')

  // search input reads through (possibly changed) meal properties
  eventifySearchMealsInput(
    headerElement.searchInput, 
    mealsElement.allMealBoxes,
    () => { createMasonryLayout(state.getNoOfColsDisplayed()) }
  )
}
