import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import React, { Component } from "react";
import Book from "../components/Book";

export default class Search extends Component {
  render() {
    return (
      <div className="main">
        {this.props.loading && <Loading />}
        <div className="search-container">
          <div className="search-container-bar">
            <Link
              onClick={(e) => {
                this.props.SetQuery("");
              }}
              className="close-btn-bar"
              to="/"
            >
              Close
            </Link>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.props.query}
                onChange={(e) => {
                  this.props.SetQuery(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="search-results">
          <ol className="books-box">
            {this.props.results.length == 0 && this.props.query ? (
              <div className="not-found">No Books Like: {this.props.query}</div>
            ) : (
              this.props.query &&
              this.props.results.map((book) => {
                return (
                  <Book
                    key={book.id}
                    book={book}
                    ChangeShelf={this.props.ChangeShelf}
                  />
                );
              })
            )}
          </ol>{" "}
        </div>
      </div>
    );
  }
}
