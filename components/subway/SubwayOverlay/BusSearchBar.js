import React, { useMemo, useState } from "react";
import { useGetSubwayArrival } from "../../../hooks/queries/subway/useGetSubwayArrival";
import { debouncer } from "../../../utils/debouncing";
import Overlay from "../../common/overlay/Overlay";
import Input from "../../common/Input/Input";
import { FlatList } from "react-native";
import { useGetSearchBusStation } from "../../../hooks/queries/bus/useGetSearchBusStation";
import { useGetSubwayStation } from "../../../hooks/queries/subway/useGetSubwayStation";

function BusSearchBar() {
  const [searchWord, setSearchWord] = useState("");

  //   const { data: subwayArrivalData } = useGetSubwayArrival(searchWord);
  const { data: subwayStationData } = useGetSubwayStation(searchWord);

  console.log(subwayStationData);

  const debouncingSearchWord = useMemo(
    () => debouncer((value) => setSearchWord(value), 500),
    []
  );

  const onChangeText = (text) => {
    debouncingSearchWord(text);
  };

  const renderItem = ({ item }) => {};

  return (
    <Overlay height="30%" top="40px" xPadding="13%">
      <Input placeholder="정거장 검색" onChangeText={onChangeText}></Input>
      {/* <FlatList
        renderItem={renderItem}
        data={subwayStationData.stationList}
        keyExtractor={(item) => {
          item.id;
        }}
        ListHeaderComponent={<></>}
      /> */}
    </Overlay>
  );
}

export default BusSearchBar;
