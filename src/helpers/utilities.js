// Sort any array objects using defined fields by hierarchy
export const fieldSorter = (fields) => (a, b) =>
  fields
    .map((o) => {
      let dir = 1;
      if (o[0] === '-') {
        dir = -1;
        o = o.substring(1);
      }
      return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
    })
    .reduce((p, n) => (p ? p : n), 0);

// Sort Any Array object list in alphabetical order converting to multi-dimensional array
export const sortContacts = (contacts) => {
  let customMap = contacts.reduce((p, c) => {
    let char = c.name.charAt(0).toUpperCase();
    p[char] = [].concat(p[char] || [], c);
    return p;
  }, {});

  return Object.keys(customMap).map((k) => ({
    letter: k,
    names: customMap[k]
  }));
};

// Get Item from local storage
export const getStorageItem = (key, isArray = false) => {
  return isArray
    ? JSON.parse(localStorage.getItem(key))
    : JSON.parse(localStorage.getItem(key));
};

// Set Item to local storage
export const setStorageItem = (key, payload, isArray = false) => {
  localStorage.setItem(key, isArray ? JSON.stringify(payload) : payload);
};

// Set Item to local storage
export const removeStorageItem = (key) => {
  localStorage.removeItem(key);
};

// Capitalise first letter of each word
export const toTitleCase = (str) => {
  return str.replace(/(?:^|\s)\S/g, (match) => {
    return match.toUpperCase();
  });
};

// Split string
export const explode = (delimiter, string) => {
  return string.split(delimiter);
};

// Join Array & Convert to String
export const implode = (delimiter, array) => {
  return array.join(delimiter);
};

// Format currency
export const formatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 0
});

// Create Name Initials
export const nameInitials = (name) => {
  let regex = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  let initials = [...name.matchAll(regex)] || [];

  return (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();
};

// Date generator
export const currentDate = (timeString = false) => {
  let date = new Date();
  if (timeString) {
    return date.toLocaleTimeString(
      {},
      { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
    );
  }

  return date.toLocaleString();
};

//Calculate percentage
export const findDiscount = (amount, value) => {
  let discount = (amount * value) / 100;
  return amount - discount;
};

//pagination
export const paginate = (currentPage, recordsPerPage, array) => {
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const records = array.slice(indexOfFirstRecord, indexOfLastRecord);
  return records;
};

export const getRole = (roleID) => {
  let role;

  switch (roleID) {
    case '1':
      role = 'RETAILER';
      break;
    case '2':
      role = 'FARMER';
      break;
    case '3':
      role = 'SALES REP';
      break;
    case '4':
      role = 'ADMIN';
      break;

    default:
      role = '1';
      break;
  }

  return role;
};
