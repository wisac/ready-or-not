const asyncWrapper = (controllerFn) => {
   return async (req, res, next) => {
      await controllerFn(req, res, next).catch(next);
   };
};

export default asyncWrapper;

// const hello = () => {
//    console.log("hello")
// }

// const result = asyncWrapper((s) => {
//    console.log("testing")
// });
// console.log(result);
// result();
