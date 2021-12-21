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
  // TODO: TEXT MUSS MINDESTEN 3 ZEICHEN LANG SEIN UND SOLLTE NOCH NICHT VORHANDEN SEIN
  STORAGE.addObject(LIST_STORAGE_NAME, {id, name});
}

function setDefaultList() {
  if(issetList(DEFAULT_LIST_NAME)) return;
  createList(uuidv4(),DEFAULT_LIST_NAME);
}

function renderLists(){
  const lists = STORAGE.getObjects(LIST_STORAGE_NAME);
  const wrap = document.querySelector('.lists');
  wrap.innerHTML = null;
  wrap.innerHTML += `<h2>Listen ${lists.length}</h2>`;



  lists.forEach(list=>{

    let div  = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = list.name;

    let btn = document.createElement('button');
    btn.innerText = "Löschen";
    btn.onclick = () => {
      STORAGE.removeObject(LIST_STORAGE_NAME, 'id', list.id);
      renderLists();
    }

    div.appendChild(span);
    if(DEFAULT_LIST_NAME !== list.name) {
      div.appendChild(btn);
    }

    wrap.appendChild(div);
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