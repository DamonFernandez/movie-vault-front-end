//movie type
export interface Movie {
  movieID: number;
  title: string;
  release_date: string;
  poster: string;
  vote_average: number;
  genres: string[];
}

//movie type detailed
export interface Movie_detailed {
  movieID: number;
  title: string;
  release_date: string;
  poster: string;
  vote_average: number;
  genres: string[];
  overview: string;
  original_language: string;
  homepage: string;
  production_companies: string[];
  runtime: number;
  tagline: string;
}
//movie card props
export interface MovieCardProps {
  movie: Movie;
}
//movie card props detailed
export interface MovieCardProps_detailed {
  movie: Movie_detailed;
}


//filter list props
export interface FilterListProps {
  search: string;
  setSearch: (search: string) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
  original_language: string;
  setoriginal_language: (original_language: string) => void;
  year: string;
  setYear: (year: string) => void;
  setSortBy: (sortBy: string) => void;
}

export interface LoginAndSignUpProps {
  setApiKey: (apiKey: string) => void;
}
