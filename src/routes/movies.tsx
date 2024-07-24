import { useEffect, useState } from "react";
import axios from "axios";

import MovieList from "../components/MovieList.tsx";
import FilterList from "../components/FilterList.tsx";
import NavBar from "../components/NavBar.tsx";
import { API_KEY } from "../components/APIContextProvider.tsx";
import { useContext } from "react";
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

    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('all');
    const [original_language, setoriginal_language] = useState('all');
    const [year, setYear] = useState('');

    const [sortBy, setSortBy] = useState('');

    const apiKey = useContext(API_KEY);

    useEffect(() => {
        axios.get("https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/movies/")
            .then((response) => {
                setMovieList(response.data);
                console.log(apiKey);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    useEffect(() => {
        const { startIndex, endIndex } = pagination;
        setMovies(movieList.slice(startIndex, endIndex));
    }, [movieList, pagination]);

    useEffect(() => {
        let uri = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/movies/?title=${search}&release_date=${year}`;
        if (genre !== "all") {
            uri += `&genres=${genre}`;
        }
        if (original_language !== "all") {
            uri += `&original_language=${original_language}`;
        }
        axios.get(uri)
            .then((response) => {
                setMovieList(response.data);
                setPagination({
                    page: 1,
                    pageList: [1],
                    startIndex: 0,
                    endIndex: LIMIT,
                });
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, [search, genre, original_language, year]);

    useEffect(() => {
        if (sortBy === "title") {
            setMovieList(movieList.sort((a, b) => a.title.localeCompare(b.title)));
        } else if (sortBy === "release_date") {
            setMovieList(movieList.sort((a, b) => a.year - b.year));
        } else if (sortBy === "rating") {
            getRatings();
            setMovieList(movieList.sort((a, b) => b.rating - a.rating));
        }
    }, [sortBy]);
    const getRatings = () => {
        // axios.get(`https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/movies/$`)
        //     .then((response) => {
        //         const ratings = response.data;
        //         movieList.forEach((movie) => {
        //             movie.rating = ratings.find((rating) => rating.movieID === movie.movieID)?.rating || 0;
        //         });
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching ratings:", error);
        //     }
        //     );
    }
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
            <NavBar />
            <FilterList
                search={search}
                genre={genre}
                original_language={original_language}
                year={year}
                setSearch={setSearch}
                setGenre={setGenre}
                setoriginal_language={setoriginal_language}
                setYear={setYear}
                setSortBy={setSortBy}

            />
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