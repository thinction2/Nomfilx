export const API_KEY = "b636a99b8288c69b0400049df347d038";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  //   original_language: string;
  //   original_title: string;
  //   popularity: number;
  //   release_date: string;
  //   video: false;
  //   vote_average: number;
  //   vote_count: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = () => {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};
