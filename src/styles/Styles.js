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
    height: moderateScale(85)
  },
  appHeaderFont: {
    fontSize: moderateScale(20)
  },
  appHeaderIcon: {
    fontSize: moderateScale(32)
  },

  //Sidebar style
  sideBarCoverImage: {
    height: verticalScale(175),
    alignSelf: "stretch",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  sideBarLogoImage: {
    height: verticalScale(80),
    width: moderateScale(70),
    marginBottom: scale(5)
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
    fontSize: moderateScale(42)
  }
});
