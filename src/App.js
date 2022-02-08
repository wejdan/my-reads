import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import * as Api from "./Api";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { booksList: [], loading: false, query: "", results: [] };
    this.SetQuery = this.SetQuery.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.ChangeShelf = this.ChangeShelf.bind(this);
  }
  componentDidMount() {
    this.setLoading(true);
    this.getAllBooks().then(() => {
      this.setLoading(false);
    });
  }

  setBooks = (books) => {
    this.setState({ booksList: books });
  };

  setLoading = (loading) => {
    this.setState({ loading: loading });
  };
  getAllBooks = async () => {
    const books = await Api.getAllBooks();
    console.log(books);
    this.setBooks(books);
  };
  SetQuery = async (newQuery) => {
    this.setState({ query: newQuery });
    if (newQuery) {
      this.setLoading(true);
      let data = await Api.searchBook(newQuery);
      if (data.error) {
        this.setResults([]);
      } else {
        let tempResults = [];
        data.map((book) => {
          if (
            this.state.booksList.filter((e) => e.id === book.id).length == 0
          ) {
            tempResults.push(book);
          }
        });

        this.setResults(tempResults);
      }

      this.setLoading(false);
    }
  };
  setResults = (newResults) => {
    this.setState({ results: newResults });
  };

  ChangeShelf = async (book, shelf) => {
    this.setLoading(true);
    const response = await Api.updateBook(book, shelf);
    await this.getAllBooks();
    let tempResults = [];
    this.state.results.map((book) => {
      if (this.state.booksList.filter((e) => e.id === book.id).length == 0) {
        tempResults.push(book);
      }
    });

    this.setResults(tempResults);

    this.setLoading(false);
  };
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                booksList={this.state.booksList}
                ChangeShelf={this.ChangeShelf}
                loading={this.state.loading}
              />
            }
          />

          <Route
            path="/search"
            element={
              <Search
                ChangeShelf={this.ChangeShelf}
                SetQuery={this.SetQuery}
                results={this.state.results}
                query={this.state.query}
                loading={this.state.loading}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}
