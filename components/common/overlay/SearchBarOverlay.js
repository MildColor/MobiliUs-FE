import React, { useCallback, useMemo } from "react";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import { debouncer } from "../../../utils/debouncing";
import Constants from "expo-constants";

const SearchBarOverlay = ({ setSearchWord }) => {
  const apiUrl = Constants.expoConfig.extra.API_URL;

  const debouncingSearchWord = useMemo(
    () => debouncer((value) => setSearchWord(value), 500),
    []
  );

  const onChangeText = (text) => {
    debouncingSearchWord(text);
  };

  return (
    <Container>
      <SearchInput
        placeholder="정류장 검색"
        onChangeText={onChangeText}
      ></SearchInput>

      <Text>{apiUrl ?? "아 왜"}</Text>
    </Container>
  );
};

export default SearchBarOverlay;

const Container = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 60px;
  top: 30px;
  padding-left: 13%;
  padding-right: 13%;
  margin-top: 10px;
`;

const SearchInput = styled(TextInput)`
  width: 100%;
  height: 40px;
  background-color: gainsboro;
  border-radius: 15px;
  padding-left: 15px;
  padding-right: 15px;
`;
