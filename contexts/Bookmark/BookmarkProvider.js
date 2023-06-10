import React, { Children, useState } from "react";
import { BookmarkContext } from "./BookmarkContext";

function BookmarkProvider({ children }) {
  const [busBookmark, setBusBookmark] = useState(null);
  const [subwayBookmark, setSubwayBookmark] = useState(null);

  return (
    <BookmarkContext.Provider
      value={{ busBookmark, setBusBookmark, subwayBookmark, setSubwayBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;
