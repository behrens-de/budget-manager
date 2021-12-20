import _ from 'lodash';
import {test as t} from './test';

function component() {
  const element = document.createElement('div');
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack',t()], ' ');
  return element;
}

document.body.appendChild(component());