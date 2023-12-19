const formattedResponse = (status, value) => {
   if (status === "success" && Array.isArray(value)) {
      return {
         status,
         result: value.length,
         data: value,
      };
   }

   if (status === "success") {
      return {
         status,
         data: value,
      };
   }

   if (status === "fail" || status === "error") {
      return {
         status,
         message: value,
      };
   }

   return {};
};

export default formattedResponse;
