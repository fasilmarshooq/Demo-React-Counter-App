import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "./../Services/genreService";
import { getMovie, saveMovie } from "./../Services/movieService";
import { toast } from "react-toastify";

class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  async componentDidMount() {
    await this.updateGenre();
    await this.updateMovies();
  }

  async updateGenre() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async updateMovies() {
    try {
      const movieId = this.props.match.params.Id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/movies");
      toast.error("Movie Not Found");
    }
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInputDropDown(this.state.genres, "genreId", "Genre")}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
