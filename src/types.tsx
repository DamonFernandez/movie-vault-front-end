//movie type
export interface Movie {
    movieID: number;
    title: string;
    year: number;
    poster: string;
}
//movie card props
export interface MovieCardProps {
    movie: Movie;
}