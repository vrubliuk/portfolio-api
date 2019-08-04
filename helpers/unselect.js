module.exports = (obj, ...fields) => {
  const newObj = {};
  for (const key in obj) {
    if (!fields.includes(key)) newObj[key] = obj[key];
  }
  return newObj;
};
