import jwt from "jsonwebtoken";

const JWTGenerator = (id) => {
   const token = jwt.sign({ id }, process.env.JWT_SECRETE, {
      expiresIn: process.env.JWT_EXPIRY,
   });

   return token;
};

const JWTVerifier = (token) => {
   const decoded = jwt.verify(token, process.env.JWT_SECRETE, {
      ignoreExpiration: false,
   });
   return decoded;
};

export { JWTGenerator, JWTVerifier };
