/**
 * This file define all styles use in App
 * @author : Hoang Duy
 */
import { StyleSheet, Platform } from "react-native";
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
    height: Platform.OS === "ios" ? verticalScale(85) : moderateScale(60)
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
    fontSize: Platform.OS === "ios" ? verticalScale(22) : moderateScale(16)
  },

  //List Customer style
  customerItem: {
    height: Platform.OS === "ios" ? verticalScale(84) : moderateScale(72)
  },
  customerItemFont: {
    fontSize: Platform.OS === "ios" ? verticalScale(42) : moderateScale(25)
  },
  customerItemIcon: {
    fontSize: Platform.OS === "ios" ? verticalScale(26) : moderateScale(28)
  },

  //Detail style
  detailItemFont: {
    fontSize: verticalScale(26)
  },

  //Add/Edit Customer style
  inputItemFont: {
    fontSize: Platform.OS === "ios" ? verticalScale(20) : moderateScale(15)
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
    fontSize: Platform.OS === "ios" ? verticalScale(25) : moderateScale(30),
    flexWrap: "wrap",
    marginRight: Platform.OS === "ios" ? verticalScale(4) : moderateScale(4)
  },
  itemContentFont: {
    fontSize: Platform.OS === "ios" ? verticalScale(25) : moderateScale(25),
    fontWeight: "bold"
  }
});
