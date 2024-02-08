import strings from './strings.json';

type keyTypes = keyof typeof strings;

export const translate = (key: keyTypes) => {
  return strings[key];
};
