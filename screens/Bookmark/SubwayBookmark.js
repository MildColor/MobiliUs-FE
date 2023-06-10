import React, { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useGetBusBookmark } from "../../hooks/queries/bus/useGetBusBookmark";
import { BookmarkContext } from "../../contexts/Bookmark/BookmarkContext";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import Overlay from "../../components/common/overlay/Overlay";
import { LinearGradient } from "expo-linear-gradient";
import { useGetSubwayBookmark } from "../../hooks/queries/subway/useGetSubwayBookmark";
import Icon from "react-native-vector-icons/FontAwesome";

function SubwayBookmark() {
  const navigation = useNavigation();
  const { data: subwayBookmarks } = useGetSubwayBookmark();
  console.log(subwayBookmarks?.data);
  const { subwayBookmark, setSubwayBookmark } = useContext(BookmarkContext);

  const onPressBookmark = (item) => {
    console.log("onPressBookmark", item);
    setSubwayBookmark({
      departure: item.departure,
      departureLine: item.departureLine,
      destination: item.destination,
      destinationLine: item.destinationLine,
    });
    navigation.navigate("Subway");
  };

  const rederItem = ({ item }) => {
    console.log("travelTime", item);
    return (
      <Item onPress={() => onPressBookmark(item)} style={styles.button}>
        <DepartureText>{item?.departure}</DepartureText>
        <ArrowIcon name={"arrow-right"} size={15} color="#7DD1FF"></ArrowIcon>
        <DestinationText>{item?.destination}</DestinationText>
      </Item>
    );
  };

  return (
    <BackgroundView>
      <ColorView colors={["#8EFFD4", "#7DD1FF"]}>
        <TitleText>Subway Bookmark</TitleText>
      </ColorView>
      <Overlay height="75%" bottom="0">
        <FlatList
          data={subwayBookmarks?.data}
          renderItem={rederItem}
          showsVerticalScrollIndicator={false}
        />
      </Overlay>
    </BackgroundView>
  );
}

export default SubwayBookmark;

const Item = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  /* border: 1px solid gray; */
  margin: 10px auto;
  padding: 10px;
  background-color: white;
  position: relative;
`;

const DepartureText = styled(Text)``;

const ArrowIcon = styled(Icon)`
  position: absolute;
  left: 150px;
`;

const DestinationText = styled(Text)``;

const BackgroundView = styled(View)`
  flex: 1;
  background-color: white;
`;

const ColorView = styled(LinearGradient)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30%;
`;

const TitleText = styled(Text)`
  font-size: 40px;
  color: white;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  button: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 3, width: 3 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 3, // Android
  },
});
