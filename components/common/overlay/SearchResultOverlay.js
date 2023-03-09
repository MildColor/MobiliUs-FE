import React from "react";
import { FlatList, TouchableOpacity } from "react-native";

function SearchResultOverlay() {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <Text></Text>
      </TouchableOpacity>
    );
  };

  return <FlatList renderItem={renderItem} />;
}

export default SearchResultOverlay;
