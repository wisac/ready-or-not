const fs = require("fs");

function extractColorsFromFile(filePath) {
   try {
      const cssContent = fs.readFileSync(filePath, "utf-8");
      const rootPattern = /:root\s*{\s*([^}]+)\s*}/;
      const match = cssContent.match(rootPattern);

      if (match && match[1]) {
         return match[1];
      } else {
         return "";
      }
   } catch (error) {
      console.error("Error reading the file:", error.message);
      return "";
   }
}

 function convertToJSON(colorsString) {
   colorsString = colorsString.replace(/--/g, "").replace(/;/g, ",");

   const lines = colorsString.split("\n");
   const colorsObject = {};

   lines.forEach((line) => {
      if (line.trim() === "") return;
      const [key, value] = line.split(":");
      colorsObject[key.trim()] = value.trim().replace(/,$/, ""); // Remove trailing comma
   });

   return JSON.stringify(colorsObject, null, 2);
}


// Example usage:
const cssFilePath = "./src/assets/main.css";
const colorsString = extractColorsFromFile(cssFilePath);
const jsonColors = convertToJSON(colorsString);

console.log(jsonColors);
