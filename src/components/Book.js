import React from "react";

function Book(props) {
  return (
    <li key={props.book.id}>
      <div className="book">
        <div className="book-position">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${
                props.book.imageLinks && props.book.imageLinks.thumbnail
              }")`,
            }}
          />
          <div className="shelf-shfiter">
            <select
              defaultValue="move"
              onChange={(e) => {
                props.ChangeShelf(props.book.id, e.target.value);
              }}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option
                value="currentlyReading"
                disabled={props.book.shelf == "currentlyReading"}
              >
                Currently Reading
              </option>
              <option
                value="wantToRead"
                disabled={props.book.shelf == "wantToRead"}
              >
                Want to Read
              </option>
              <option value="read" disabled={props.book.shelf == "read"}>
                Read
              </option>
              <option value="none" disabled={props.book.shelf == undefined}>
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-author">
          {props.book.authors && props.book.authors.toString()}
        </div>
      </div>
    </li>
  );
}

export default Book;
