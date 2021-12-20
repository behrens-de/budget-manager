import { MyLocalStorage } from './MyLocalStorage';
import {List} from './Lists'
const storage = new MyLocalStorage;
const list = new List;

// ADD OR SUB TO STORAGE
const INPUT = document.querySelector('#sum');
const FORM = document.querySelector('#setItem');
const DIV_HISTORY = document.querySelector('.History');
const ITEM_NAME = 'myItems';

function* listIDgenerator() {
  let i = 0
  while (true) {
      yield i + 1; i = i + 1;
  }
}

const listID = listIDgenerator();


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
  const items = storage.getObjects(ITEM_NAME);
  DIV_HISTORY.innerHTML = `<h2>History</h2>`;
  items.forEach(item => {
    DIV_HISTORY.innerHTML += `-${item.value} €<hr>`;
  });

}



function safeData() {

  const value = parseFloat(INPUT.value.replace(",", "."));

  storage.addObject(ITEM_NAME,
    {
      value
    })

    showHistory();
    resetInput(INPUT);
    list.add({
      id: listID.next().value,
      name: 'muster'
    })
}


function submitForm(e) {
  e.preventDefault();
  if (!isEuroFormat(INPUT.value)) return;
  return safeData();
}




function init(){
  showHistory();
}

init();
INPUT.addEventListener('blur', checkInput);
FORM.addEventListener('submit', submitForm)