import { model } from "mongoose";

class ApiFeatures {
   constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
   }

   filter() {
      console.log(this.queryString);
      console.log("query:", model);

      // remove other feature params
      const queryObj = { ...this.queryString };
      const excludeParams = ["sort", "limit", "page", "fields"];
      excludeParams.forEach((el) => delete queryObj[el]);

      // format query object to valid mongo query
      const queryStr = JSON.stringify(queryObj).replace(
         /\b(gte|gt|lte|lt)\b/g,
         (match) => `$${match}`
      );

      // use formatted query
      const newQueryObj = JSON.parse(queryStr);
      this.query = this.query.find(newQueryObj);

      return this;
   }

   sort() {
      let sortBy = "level";
      console.log(this.queryString.sort);
      if (this.queryString.sort) {
         sortBy = this.queryString.sort.replace(",", " ");
      }
      this.query = this.query.sort(sortBy);
      console.log(sortBy);
      return this;
   }

   limitFields() {
      const fields = this.queryString.fields
         ? this.queryString.fields.replace(",", " ")
         : "-__v";
      this.query = this.query.select(fields);
      return this;
   }
}

export default ApiFeatures;
