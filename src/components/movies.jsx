import React, { Component } from "react";
import { getMovies } from "../Services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../util/paginate";
import { getGenres } from "../Services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Input from "./common/input";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All",
    sortColumn: { path: "title", order: "asc" },
    searchText: "",
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genre: getGenres() });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].IsLiked = !movies[index].IsLiked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handlegenreChange = (genre) => {
    const currentGenre = genre;

    this.setState({ currentGenre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    let { currentGenre, searchText } = this.state;
    searchText = query;
    currentGenre = query ? "All" : currentGenre;

    this.setState({ currentGenre, searchText });
  };

  getPageData = () => {
    const {
      currentGenre,
      movies,
      currentPage,
      pageSize,
      sortColumn,
      searchText,
    } = this.state;
    const filtered =
      currentGenre === "All"
        ? movies.filter((x) =>
            x.title.toLowerCase().includes(searchText.toLowerCase())
          )
        : movies.filter((x) => x.genre.name === currentGenre);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginatedMovies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: paginatedMovies };
  };

  render() {
    const {
      currentGenre,
      currentPage,
      genre,
      sortColumn,
      searchText,
    } = this.state;

    const { totalCount, data } = this.getPageData();

    return (
      <div className="row">
        <div className="col-1.2 m-4">
          <ListGroup
            items={genre}
            currentGenre={currentGenre}
            ongenreChange={this.handlegenreChange}
          />
        </div>
        <div className="col-5">
          <div className="row m-1">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <span className="align-right ml-4">
              <p>Available MOvies : {totalCount}</p>
            </span>
          </div>
          <SearchBox value={searchText} onChange={this.handleSearch} />
          <div className="table-responsive m-2">
            <MoviesTable
              movies={data}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemCount={totalCount}
              pageSize={4}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
