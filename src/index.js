import { MyLocalStorage } from './MyLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const STORAGE = new MyLocalStorage;
const LIST_STORAGE_NAME = 'lists';
const DEFAULT_LIST_NAME = 'allgemein';
// Setze eine Default Liste

function issetList(listname){
  const lists = STORAGE.getObjects(LIST_STORAGE_NAME);
  lists.filter(list=>list.name === listname);
  return lists.length > 0;
}

function createList(id,name){
  STORAGE.addObject(LIST_STORAGE_NAME, {id, name});
}

function setDefaultList() {
  if(issetList(DEFAULT_LIST_NAME)) return;
  createList(uuidv4(),DEFAULT_LIST_NAME);
}

function renderLists(){
  const lists = STORAGE.getObjects(LIST_STORAGE_NAME);
  const div = document.querySelector('.lists');
  div.innerHTML = null;
  div.innerHTML += `<h2>Listen</h2>`;
  lists.forEach(list=>{
    div.innerHTML += `${list.name}<button>Löschen</button><br>`;
  }) 
}

function newList(){
  const form = document.querySelector('#new-list');
  const input = form.querySelector('.list-name');

  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    createList(uuidv4(),input.value);
    renderLists();
    input.value = null;
  });
}


function init(){
  setDefaultList();
  renderLists();
  newList();
}

// Start the APP
init();