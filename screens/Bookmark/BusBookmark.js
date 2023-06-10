import React, { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetBusBookmark } from "../../hooks/queries/bus/useGetBusBookmark";
import { BookmarkContext } from "../../contexts/Bookmark/BookmarkContext";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import Overlay from "../../components/common/overlay/Overlay";
import { LinearGradient } from "expo-linear-gradient";

function BusBookmark() {
  const navigation = useNavigation();
  const { data: busBookmarks } = useGetBusBookmark();
  console.log(busBookmarks?.data?.bookmarkList);
  const { busBookmark, setBusBookmark } = useContext(BookmarkContext);

  const onPressBookmark = ({
    stationId,
    stationName,
    latitude,
    longitude,
    localState,
  }) => {
    setBusBookmark({ stationId, stationName, latitude, longitude, localState });

    navigation.navigate("Bus");
  };

  const rederItem = ({ item }) => {
    // console.log(item);
    return (
      //   <Text>{item.stationName + " " + item.stationId}</Text>

      <Item onPress={() => onPressBookmark(item)} style={styles.button}>
        <Text>{item?.stationName}</Text>
      </Item>
    );
  };

  return (
    <BackgroundView>
      <ColorView colors={["#8EFFD4", "#7DD1FF"]}>
        <TitleText>Bus Bookmark</TitleText>
      </ColorView>
      <Overlay height="75%" bottom="0">
        <FlatList
          data={busBookmarks?.data?.bookmarkList}
          renderItem={rederItem}
          showsVerticalScrollIndicator={false}
        />
      </Overlay>
    </BackgroundView>
  );
}

export default BusBookmark;

const Item = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 240px;
  height: 50px;
  border-radius: 10px;
  /* border: 1px solid gray; */
  margin: 10px auto;
  padding: 10px;
  background-color: white;
`;

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
