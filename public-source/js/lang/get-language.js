
import { languagesAvailable } from './languages';

export default function getCurrentLanguage() {
  return getFromRadios() || getFromLocalStorage() || languagesAvailable[0];
}

function getFromRadios() {
  const radio = document.querySelector('input[type=radio]:checked');
  const language = radio && radio.id;
  return languagesAvailable.includes(language) && language;
}

function getFromLocalStorage() {
  const { language } = localStorage;
  return languagesAvailable.includes(language) && language;
}
