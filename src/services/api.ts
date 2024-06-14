import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "9b8f49825fbce72898eb0c26d0582b41",
    language: "pt-BR",
    include_adult: "false",
  },
});
