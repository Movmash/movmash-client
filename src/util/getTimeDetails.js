const getTimeDetails = (givenDateInfo, detail) => {
  const dateInfo = new Date(givenDateInfo);
  const date = dateInfo.getDate();
  const month = dateInfo.getMonth();
  const hour = dateInfo.getHours();
  const minutes = dateInfo.getMinutes();
  let monthLetter;
  switch (month) {
    case 0:
      monthLetter = "JAN";

      break;
    case 1:
      monthLetter = "FEB";

      break;
    case 2:
      monthLetter = "MAR";

      break;
    case 3:
      monthLetter = "APR";

      break;
    case 4:
      monthLetter = "MAY";

      break;
    case 5:
      monthLetter = "JUN";

      break;
    case 6:
      monthLetter = "JUL";

      break;
    case 7:
      monthLetter = "AUG";

      break;
    case 8:
      monthLetter = "SEP";

      break;
    case 9:
      monthLetter = "OCT";

      break;
    case 10:
      monthLetter = "NOV";

      break;
    case 11:
      monthLetter = "DEC";

      break;

    default:
      // console.log(month);
      break;
  }

  switch (detail) {
    case "d":
      if (Math.floor(date / 10) === 0) return `0${date}`;
      return date;

    case "m":
      return monthLetter;
    case "h":
      if (hour === 0) return "00";
      else return hour;
    case "min":
      if (minutes === 0) return "00";
      else if (Math.floor(minutes / 10) === 0) return `0${minutes}`;
      else return minutes;
    default:
      // console.log(detail);
      break;
  }
};

export default getTimeDetails;
