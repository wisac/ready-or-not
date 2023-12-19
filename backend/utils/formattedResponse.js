const formattedResponse = (status, value) => {
   if (status === "success") {
      return {
         status,
       data: { value }
      };
   }
   if (status === "fail" || status === "error") {
      return {
         status,
         message: value,
      };
   }
};

export default formattedResponse;
