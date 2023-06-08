import React, { useContext } from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetBusBookmark } from "../../hooks/queries/bus/useGetBusBookmark";
import { BookmarkContext } from "../../contexts/Bookmark/BookmarkContext";
import { useNavigation } from "@react-navigation/native";

function BusBookmark() {
  const navigation = useNavigation();
  const { data: BusBookmark } = useGetBusBookmark();
  console.log(BusBookmark?.data?.bookmarkList);
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

      <Pressable onPress={() => onPressBookmark(item)}>
        <Text>{item?.stationName}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <FlatList data={BusBookmark?.data?.bookmarkList} renderItem={rederItem} />
    </SafeAreaView>
  );
}

export default BusBookmark;
