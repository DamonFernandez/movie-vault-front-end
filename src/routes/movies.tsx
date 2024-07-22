import { useEffect, useState } from "react";
import MovieList from "../components/MovieList.tsx";
import axios from "axios";
import { Movie } from "../types.tsx";
import "../styles/movies.css";

export default function Movies() {
    const LIMIT = 48;

    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pageList: [1],
        startIndex: 0,
        endIndex: LIMIT,
    });

    useEffect(() => {
        axios.get("https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/movies/")
            .then((response) => {
                setMovieList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    useEffect(() => {
        const { startIndex, endIndex } = pagination;
        setMovies(movieList.slice(startIndex, endIndex));
    }, [movieList, pagination]);

    const nextPage = () => {
        const { page, pageList } = pagination;
        const newPage = page + 1;
        const newStartIndex = newPage * LIMIT;
        const newEndIndex = (newPage + 1) * LIMIT;

        setPagination({
            ...pagination,
            page: newPage,
            pageList: [...pageList, newPage],
            startIndex: newStartIndex,
            endIndex: newEndIndex,
        });

        setMovies(movieList.slice(newStartIndex, newEndIndex));
    };

    const prevPage = () => {
        const { page, pageList } = pagination;

        if (page > 1) {
            const newPage = page - 1;
            const newStartIndex = (newPage - 1) * LIMIT;
            const newEndIndex = newPage * LIMIT;

            setPagination({
                ...pagination,
                page: newPage,
                pageList: pageList.filter((pageNumber) => pageNumber !== page),
                startIndex: newStartIndex,
                endIndex: newEndIndex,
            });

            setMovies(movieList.slice(newStartIndex, newEndIndex));
        }
    };

    const goToPage = (pageNumber: number) => {
        const newStartIndex = (pageNumber - 1) * LIMIT;
        const newEndIndex = pageNumber * LIMIT;

        setPagination({
            ...pagination,
            startIndex: newStartIndex,
            endIndex: newEndIndex,
            page: pageNumber,
        });

        setMovies(movieList.slice(newStartIndex, newEndIndex));
    };

    return (
        <div>
            <p>NAVBAR</p>
            <p>FILTERS</p>
            <MovieList movies={movies} />
            <div className="pages">
                Page{" "}
                {pagination.pageList.map((pageNumber, index) => (
                    <button onClick={() => goToPage(pageNumber)} key={index} style={{ fontWeight: pageNumber === pagination.page ? "bold" : "normal", }}>
                        {pageNumber}
                    </button>
                ))}
            </div>
            <button onClick={nextPage}>Next</button>
            <button onClick={prevPage}>Previous</button>
        </div>
    );
}