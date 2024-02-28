export const nodeStyle = (x: number) => {
  console.log(`nodeStyle`, x);
  switch (x) {
    case 100:
      return { backgroundColor: "#85b9db6b", borderColor: "#85b9db" };
    case 370:
      return { backgroundColor: "#ffc96c6b", borderColor: "#ffc96c" };
    case 640:
      return { backgroundColor: "#3b95f66b", borderColor: "#3b95f6" };
    case 910:
      return { backgroundColor: "#cfb4ff6b", borderColor: "#cfb4ff" };
    case 1160:
      return { backgroundColor: "#ff00006b", borderColor: "#ff0000" };
    case 1410:
      return { backgroundColor: "#45e3596b", borderColor: "#45e359" };
    case 1680:
      return { backgroundColor: "#5652ff6b", borderColor: "#5652ff" };
    case 1950:
      return { backgroundColor: "#37ffe46b", borderColor: "#37ffe4" };
    case 2050:
      return { backgroundColor: "#c537ff6b", borderColor: "#c537ff" };
    case 2150:
      return { backgroundColor: "#7878786b", borderColor: "#787878" };
    default:
        return { backgroundColor: "#ff000070", borderColor: "#ff0000" };
  }
};
