import { MyLocalStorage } from './MyLocalStorage';
const storage = new MyLocalStorage;

// ADD OR SUB TO STORAGE
const INPUT = document.querySelector('#sum');
const FORM = document.querySelector('#setItem');
const ITEM_NAME = 'myItems';


function isEuroFormat(input) {
  const regEx = /^\d{1,5}[\,]\d{2}?$/;
  return regEx.test(input);
}

function resetInput(input) {
  input.value = null; // Hallo wie gehts
}

function checkInput() {
  if (!isEuroFormat(INPUT.value)) return resetInput(INPUT);
}

function showHistory() {
  console.log(storage.getObjects(ITEM_NAME));
}



function safeData() {

  const value = parseFloat(INPUT.value.replace(",", "."));

  storage.addObject(ITEM_NAME,
    {
      value
    })

    showHistory();
}


function submitForm(e) {
  e.preventDefault();
  if (!isEuroFormat(INPUT.value)) return;
  return safeData();
}







INPUT.addEventListener('blur', checkInput);
FORM.addEventListener('submit', submitForm)