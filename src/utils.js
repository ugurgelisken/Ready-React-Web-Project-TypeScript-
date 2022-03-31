const findForTable = (searchText, text) => {
  if (searchText === '') {
    return true;
  } else {
    return JSON.stringify(text).trim().toLowerCase().includes(searchText);
  }
};

const orderByJSON = (data, value, ascDesc) => {
  const items = [...data];
  return items.sort((a, b) => {
    const _a = a[value].toString().toLowerCase();
    const _b = b[value].toString().toLowerCase();
    if (ascDesc === true) {
      if (_a < _b) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (_a > _b) {
        return -1;
      } else {
        return 1;
      }
    }
  });
};

const sortObject = (obj, key) => {
  if (obj.length > 1) {
    return obj
      .slice()
      .sort((a, b) => (a[key] > b[key] && 1) || -1)
      .reverse();
  }
  return obj;
};

const reOrderArray = (old_array, old_index, new_index) => {
  return old_array.map((item, index, array) => {
    if (index === old_index) return array[new_index];
    else if (index === new_index) return array[old_index];
    else return item;
  });
};

const calculateTotalSize = (data) => {
  return fileSizeSI(
    data.reduce((total, num) => {
      return total + num.size;
    }, 0)
  );
};

const fileSizeSI = (size) => {
  var e = (Math.log(size) / Math.log(1e3)) | 0;
  return (
    +(size / Math.pow(1e3, e)).toFixed(2) +
    ' ' +
    ('kMGTPEZY'[e - 1] || '') +
    'B'
  );
};

const toLocaleDateTime = (date) => {
  let now = new Date(date);
  return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
};

const trimLongTextMax80Char = (text) => {
  return text.substr(0, 80) + (text.length > 80 ? '...' : '');
};

const convertToSlug = (text) =>
  text
    ? text
        .toLowerCase()
        .trim()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    : '';

module.exports = {
  findForTable,
  orderByJSON,
  sortObject,
  reOrderArray,
  calculateTotalSize,
  fileSizeSI,
  toLocaleDateTime,
  trimLongTextMax80Char,
  convertToSlug,
};
