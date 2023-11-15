
const myColors = ` --secondary: #1f384c;
   --secondary-light: #4c6088;
   --seondary-lighter: rgba(31, 56, 77, 0.151);

   --primary-dark: #5a67ba;
   --primary: #c7ceff;
   --primary-light: #dfe2fa;
   --primary-lighter: rgba(110, 125, 222, 0.123);
   --primary-lightest: #f1f2f7;
   --primary-hov: #6370c5;

   --accent: #f99c30;
   --accent-light: #ffe6cc;
   --accent-hov: #ffae52;

   --neutral: #b3b3b3;
   --neutral-light: #ebebeb;
   --neutral-lighter: #f5f5f5;
   --tertiary: hsla(200, 71%, 11%, 0.478);
   --tertiary-light: rgb(176, 195, 204);
   --tertiary-ligter: rgba(31, 56, 77, 0.151);`
function convertToJSON(colorsString) {
  colorsString = colorsString.replace(/--/g, '').replace(/;/g, ',');
  
  const lines = colorsString.split('\n');
  const colorsObject = {};

  lines.forEach(line => {
    if (line.trim() === '') return;
    const [key, value] = line.split(':');
    colorsObject[key.trim()] = value.trim();
  });

  return JSON.stringify(colorsObject, null, 2);
}

console.log(convertToJSON(myColors));
