import getTypeKeyword from './types.mjs';
import { important } from './important.mjs';

var keywords = {
  important,
  types: getTypeKeyword,
};

export { keywords as default, important, getTypeKeyword as types };
