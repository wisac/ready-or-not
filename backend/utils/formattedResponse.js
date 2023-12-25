const formattedResponse = (status, value) => {
   if (Array.isArray(value)) {
      return {
         status,
         result: value.length,
         data: value,
      };
   }
   return {
      status,
      data: value,
   };
};

export default formattedResponse;
