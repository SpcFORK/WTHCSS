import getTypeKeyword from './types.js';
import { important } from './important.js';

var keywords = {
  important,
  types: getTypeKeyword,
};

export { keywords as default, important, getTypeKeyword as types };
