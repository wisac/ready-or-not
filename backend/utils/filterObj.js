/* eslint-disable arrow-body-style */

export default (obj, propertiesToRetain) => {
   const objKeys = Object.keys(obj);
   const retainedKeys = objKeys.filter((key) => {
      return propertiesToRetain.includes(key);
   });
   const newObj = {};
   retainedKeys.forEach((key) => {
      newObj[key] = obj[key];
   });

   return newObj;
};
