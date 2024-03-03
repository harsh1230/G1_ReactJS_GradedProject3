import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getAllMovies = async (data) => await axios.get(`${baseUrl}${data}`);

const getSearchedMovie = async (current, searchValue) => await axios.get(`${baseUrl}${current}?title_like=${searchValue}`);

const getFavouriteMovies = async () => await axios.get(`${baseUrl}favourite`);

const addToFavourite = async (movie) => await axios.post(`${baseUrl}favourite`, movie);

const removeFromFavourite = async (id) => await axios.delete(`${baseUrl}favourite/${id}`);

export { getAllMovies, getSearchedMovie, getFavouriteMovies, addToFavourite, removeFromFavourite };
