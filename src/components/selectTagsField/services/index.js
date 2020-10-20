import _ from 'underscore';

const TAGS_COLOR_PALETTE = [
  {
    color: '#bec4c5',
    dark: '#a3acad',
  },
  {
    color: '#a3b7cc',
    dark: '#829eba',
  },
  {
    color: '#99cbed',
    dark: '#6eb5e5',
  },
  {
    color: '#71d3b8',
    dark: '#79c9b3',
  },
  {
    color: '#f8e07f',
    dark: '#f5d44f',
  },
  {
    color: '#f2bc8d',
    dark: '#eda25f',
  },
  {
    color: '#f4ada6',
    dark: '#ee8478',
  },
  {
    color: '#d2aadd',
    dark: '#bf86ce',
  },
];

const pick = (colorHex, level) => {
  if (!colorHex) {
    return undefined;
  }
  const colorObj = _.findWhere(TAGS_COLOR_PALETTE, {
    color: colorHex.toLowerCase(),
  });

  if (!colorObj) {
    return colorHex;
  }

  return colorObj[level] || colorObj.color;
};

export const pickDarkColor = (colorHex) => pick(colorHex, 'dark');
