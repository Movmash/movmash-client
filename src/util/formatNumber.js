// const formatNumber = (n, d) => {
//   (x = ("" + n).length), (p = Math.pow), (d = p(10, d));
//   x -= x % 3;
//   return Math.round((n * d) / p(10, x)) / d + " kMGTPE"[x / 3];
// };

// console.log(formatNumber(12123123, 2));
// const moment = require("moment");
const formatNumber = (number, decPlaces) => {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  var abbrev = ["k", "m", "b", "t"];

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return number;
};

// console.log(moment("2020-09-28T17:01:18.858+00:00").fromNow());

export default formatNumber;
