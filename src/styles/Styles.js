/**
 * This file define all styles use in App
 * @author : Hoang Duy
 */
import { StyleSheet } from "react-native";
import { scale, moderateScale, verticalScale } from "../utils/scale.js";

export const styles = StyleSheet.create({
  //container default style
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  //App's Header style
  appHeader: {
    height: verticalScale(85)
  },
  appHeaderFont: {
    fontSize: verticalScale(20)
  },
  appHeaderIcon: {
    fontSize: verticalScale(25)
  },

  //Sidebar style
  sideBarCoverImage: {
    height: verticalScale(200),
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  sideBarLogoImage: {
    height: verticalScale(65),
    width: verticalScale(65),
    marginBottom: verticalScale(5)
  },
  sidebarOptionItem: {
    height: verticalScale(65)
  },
  sidebarOptionItemFont: {
    fontSize: verticalScale(22)
  },

  //List Customer style
  customerItem: {
    height: verticalScale(84)
  },
  customerItemFont: {
    fontSize: verticalScale(42)
  },
  customerItemIcon: {
    fontSize: verticalScale(26)
  },

  //Detail style
  detailItemFont: {
    fontSize: verticalScale(26)
  },

  //Add/Edit Customer style
  inputItemFont: {
    fontSize: verticalScale(20)
  },
  inputTextAreaFont: {
    fontSize: verticalScale(25)
  },

  //History style
  dateItemFont: {
    color: "red",
    fontSize: verticalScale(20)
  },
  descriptionItemFont: {
    fontSize: verticalScale(25)
  },
  moneyItemFont: {
    fontSize: verticalScale(15),
    fontStyle: "italic",
    fontWeight: "400"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  //History add style
  datePickerStyle: {
    fontSize: verticalScale(22),
    color: "blue"
  },
  datePickerTextStyle: {
    fontSize: verticalScale(22),
    color: "green"
  },
  historyAddTextStyle: {
    fontSize: verticalScale(22),
    fontWeight: "400"
  },

  //Home style
  itemTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: verticalScale(5),
    paddingLeft: verticalScale(2),
    paddingTop: verticalScale(7),
    paddingBottom: verticalScale(7)
  },
  itemTitleFont: {
    flex: 1,
    fontSize: verticalScale(25),
    flexWrap: "wrap",
    marginRight: verticalScale(4)
  },
  itemContentFont: {
    fontSize: verticalScale(25),
    fontWeight: "bold"
  }
});
