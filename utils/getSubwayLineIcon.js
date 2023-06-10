function getSubwayLineIcon(item) {
  const icon = {};

  if (item.subwayLine == "1호선") {
    icon.iconname = "numeric-1-circle";
    icon.iconcolor = "#0052A4";
  } else if (item.subwayLine == "2호선") {
    icon.iconname = "numeric-2-circle";
    icon.iconcolor = "#00A84D";
  } else if (item.subwayLine == "3호선") {
    icon.iconname = "numeric-3-circle";
    icon.iconcolor = "#EF7C1C";
  } else if (item.subwayLine == "4호선") {
    icon.iconname = "numeric-4-circle";
    icon.iconcolor = "#00A4E3";
  } else if (item.subwayLine == "5호선") {
    icon.iconname = "numeric-5-circle";
    icon.iconcolor = "#996CAC";
  } else if (item.subwayLine == "6호선") {
    icon.iconname = "numeric-6-circle";
    icon.iconcolor = "#CD7C2F";
  } else if (item.subwayLine == "7호선") {
    icon.iconname = "numeric-7-circle";
    icon.iconcolor = "#747F00";
  } else if (item.subwayLine == "8호선") {
    icon.iconname = "numeric-8-circle";
    icon.iconcolor = "#E6186C";
  } else if (item.subwayLine == "9호선") {
    icon.iconname = "numeric-9-circle";
    icon.iconcolor = "#BDB092";
  } else if (item.subwayLine == "경의중앙") {
    icon.iconname = "subway";
    icon.iconcolor = "#77C4A3"; //옥색
  } else if (item.subwayLine == "수인분당") {
    icon.iconname = "subway";
    icon.iconcolor = "#FABE00"; //노란색
  } else if (item.subwayLine == "공항철도") {
    icon.iconname = "subway";
    icon.iconcolor = "#0090D2"; //바다색
  } else if (item.subwayLine == "신분당선") {
    icon.iconname = "subway";
    icon.iconcolor = "#D31145"; //빨간색
  } else if (item.subwayLine == "경춘선") {
    item.iconname = "subway";
    item.iconcolor = "#178C72"; //청록색
  } else if (item.subwayLine == "우이신설") {
    icon.iconname = "subway";
    icon.iconcolor = "#B7C450"; //라임색
  }

  return icon;
}

export default getSubwayLineIcon;
