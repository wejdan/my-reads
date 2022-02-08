import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import React, { Component } from "react";
import Book from "../components/Book";

export default class Home extends Component {
  render() {
    return (
      <div>
        {this.props.loading && <Loading />}
        <div className="books-list_title">
          <h1>NReads</h1>
        </div>

        <div className="books-list_content">
          <div className="shelf">
            <h2 className="shelf-title">Currently Reading</h2>
            <div className="shelf-books">
              <ol className="books-box">
                {this.props.booksList.map((book) => {
                  if (book.shelf === "currentlyReading") {
                    return (
                      <Book
                        key={book.id}
                        book={book}
                        ChangeShelf={this.props.ChangeShelf}
                      />
                    );
                  }
                })}
              </ol>
            </div>
          </div>

          <div className="shelf">
            <h2 className="shelf-title">Want to Read</h2>
            <div className="shelf-books">
              <ol className="books-box">
                {this.props.booksList.map((book) => {
                  if (book.shelf == "wantToRead") {
                    return (
                      <Book
                        key={book.id}
                        book={book}
                        ChangeShelf={this.props.ChangeShelf}
                      />
                    );
                  }
                })}
              </ol>
            </div>
          </div>
          <div className="shelf">
            <h2 className="shelf-title">Read</h2>
            <div className="shelf-books">
              <ol className="books-box">
                {this.props.booksList.map((book) => {
                  if (book.shelf === "read") {
                    return (
                      <Book
                        key={book.id}
                        book={book}
                        ChangeShelf={this.props.ChangeShelf}
                      />
                    );
                  }
                })}
              </ol>
            </div>
          </div>
        </div>
        <div className="search-btn">
          <Link className="search__link" to="/search"></Link>
        </div>
      </div>
    );
  }
}
