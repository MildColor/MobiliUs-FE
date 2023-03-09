import React, { useCallback, useMemo } from "react";
import { TextInput, View } from "react-native";
import styled from "styled-components/native";
import { debouncer } from "../../../utils/debouncing";
const SearchBarOverlay = ({ setSearchWord }) => {
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
