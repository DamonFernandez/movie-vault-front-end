import { useEffect, useState } from "react";
import axios from "axios";

import MovieList from "../MovieList.tsx";
import FilterList from "../FilterList.tsx";

import { useContext } from "react";
import { Movie } from "../../types.tsx";
import "../../styles/movies.css"
import { Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../APIContextProvider.tsx";

export default function Movies() {
    const navigate = useNavigate();
    const apiContext = useContext(APIContext);
    console.log("API key in movies:", apiContext.apiKey);
    useEffect(() => {
        if (apiContext.apiKey === "") {
            console.log("No key provided yet");
            navigate("/login");
        }
    }, [apiContext.apiKey]);
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
    const [genres, setGenres] = useState(['all']);
    const [original_language, setoriginal_language] = useState('all');
    const [year, setYear] = useState('');

    const [sortBy, setSortBy] = useState('');



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

    useEffect(() => {
        let uri = `https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/movies/?title=${search}&release_date=${year}`;
        if (genres.find((genre) => genre === "all") === undefined) {
            uri += `&genres=${genres.join(" ")}`;
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
    }, [search, genres, original_language, year]);

    useEffect(() => {
        if (sortBy === "title") {
            console.log("sorting by title");
            const newMovieList = [...movieList].sort((a, b) => a.title.localeCompare(b.title));
            setMovieList(newMovieList);
            setPagination({
                page: 1,
                pageList: [1],
                startIndex: 0,
                endIndex: LIMIT,
            });
        } else if (sortBy === "release_date") {
            const newMovieList = [...movieList].sort((a, b) => a.release_date.localeCompare(b.release_date));
            setMovieList(newMovieList);
            setPagination({
                page: 1,
                pageList: [1],
                startIndex: 0,
                endIndex: LIMIT,
            });
        } else if (sortBy === "vote_average") {
            // getvote_averages();
            const newMovieList = [...movieList].sort((a, b) => b.vote_average - a.vote_average);
            setMovieList(newMovieList);
            setPagination({
                page: 1,
                pageList: [1],
                startIndex: 0,
                endIndex: LIMIT,
            });
        }
        else if (sortBy === "revert") {
            axios.get("https://loki.trentu.ca/~vrajchauhan/3430/assn/cois-3430-2024su-a2-Blitzcranq/api/movies/")
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
            setYear('');
            setGenres(['all']);
            setoriginal_language('all');
            setSearch('');

        }
    }, [sortBy]);

    const nextPage = () => {
        const { page, pageList } = pagination;
        if (page < Math.ceil(movieList.length / LIMIT) - 1) {
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
        }
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
            pageList: pagination.pageList.slice(0, pageNumber),
        });

        setMovies(movieList.slice(newStartIndex, newEndIndex));

    };

    return (
        <div>
            <FilterList
                search={search}
                genres={genres}
                original_language={original_language}
                year={year}
                setSearch={setSearch}
                setGenres={setGenres}
                setoriginal_language={setoriginal_language}
                setYear={setYear}
                setSortBy={setSortBy}

            />
            <MovieList movies={movies} />
            <div className="pages">
                <div className="pageQueue">
                    Page
                    {pagination.pageList.map((pageNumber, index) => (
                        <button onClick={() => goToPage(pageNumber)} key={index} style={{ fontWeight: pageNumber === pagination.page ? "bold" : "normal", }}>
                            {pageNumber}
                        </button>
                    ))}
                </div>
                <div className="page-nav-btns">
                    <button onClick={nextPage}>Next</button>
                    <button onClick={prevPage}>Previous</button>
                </div>
            </div>
        </div>
    );
}