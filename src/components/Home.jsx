import React, { Fragment, useEffect, useState } from "react";
import { Row, Col, Menu } from "antd";
import "./Home.css";
import MovieList from "./MovieList";
import MovieListHeading from "./MovieListHeading";
import AddFavourite from "./Favourites/AddFavourite";
import RemoveFavourite from "./Favourites/RemoveFavourite";
import Search from "antd/lib/input/Search";
import { ShowNotification } from "./Notifications/ShowNotification";
import {
  addToFavourite,
  getAllMovies,
  getFavouriteMovies,
  getSearchedMovie,
  removeFromFavourite,
} from "../service/movie";

const Home = () => {

  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovies = async (data) => {

    setLoading(true);

    await getAllMovies(data)
      .then((res) => {
        setMovies(res.data);

      })

      .catch((err) => {
        console.log(err);

      })

      .finally(() => {
        setLoading(false);

      });

  };

  useEffect(() => {

    getMovies("movies-in-theaters");

  }, []);

  const getMovieRequest = async (searchValue) => {

    await getSearchedMovie(current, searchValue)
      .then(async (res) => {

        setMovies(res.data);

      })

      .catch((err) => {

        console.log(err);

      })

      .finally(() => {

        setLoading(false);

      });
  };

  const getFavMovies = async (data) => {

    setLoading(true);

    await getFavouriteMovies()
      .then((res) => {

        setFavourites(res.data);
        setMovies(res.data);

      })

      .catch((err) => {

        console.log(err);

      })

      .finally(() => {

        setLoading(false);

      });

  };

  const addFavouriteMovie = async (movie) => {

    const checkfavourite = favourites.find((favourite) => favourite.id === movie.id);

    if (checkfavourite === undefined) {

      const newFavouriteList = [...favourites, movie];
      await addToFavourite(movie)
        .then((res) => {

          ShowNotification("This movie has been successfully added in favourites!", "success");

        })

        .catch((err) => { });

      setFavourites(newFavouriteList);
    }

    else {

      ShowNotification("This movie has already been added in favourites!", "error");

    }

  };

  const removeFavouriteMovie = async (movie) => {

    const newFavouriteList = favourites.filter((favourite) => favourite.id !== movie.id);

    const id = movie.id.toString();

    setLoading(true);

    await removeFromFavourite(id)
      .then((res) => {

        ShowNotification("This movie has been successfully removed from favourites!", "success");
        setLoading(false);
        getFavMovies();

      })

      .catch((err) => { });

    setFavourites(newFavouriteList);

  };

  const [current, setCurrent] = useState("movies-in-theaters");

  const handleClick = (e) => {

    setCurrent(e.key);
    setSearchValue("");
    e.key === "favourite" ? getFavMovies(e.key) : getMovies(e.key);

  };

  const [loading, setLoading] = useState(false);

  const onSearch = (e) => {

    setLoading(true);
    getMovieRequest(e.target.value);
    setSearchValue(e.target.value);

  };

  const el = (

    <Fragment>

      <Row className="border-bottom">
        <Col span={20}>
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="movies-in-theaters">Movies In Theaters</Menu.Item>
            <Menu.Item key="movies-coming">Coming Soon</Menu.Item>
            <Menu.Item key="top-rated-india">Top Rated Indian Movies</Menu.Item>
            <Menu.Item key="top-rated-movies">Top Rated Movies</Menu.Item>
            <Menu.Item key="favourite">Favourites</Menu.Item>
          </Menu>
        </Col>

        <Col span={4}>
          <Search size="large" placeholder="Search for a movie..." onChange={onSearch} style={{ minWidth: "200px", marginTop: "5px" }} loading={loading} name="search" value={searchValue || ""} />
        </Col>

      </Row>

      <Row className="mt-3">
        <MovieListHeading heading={current === "favourite" ? "Favourites" : "Movies On The Tip"} />
      </Row>

      <MovieList loading={loading} current={current} movies={movies} handleFavouritesClick={current === "favourite" ? removeFavouriteMovie : addFavouriteMovie} favouriteComponent={current === "favourite" ? RemoveFavourite : AddFavourite} />

    </Fragment>
  );

  return el;

};

export default Home;
