//movie type
export interface Movie {
    movieID: number;
    title: string;
    release_date: string;
    poster: string;
    rating: number;
}
//movie card props
export interface MovieCardProps {
    movie: Movie;
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

