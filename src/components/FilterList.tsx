import { FilterListProps } from '../types';
export default function FilterList({ search, setSearch, genres, setGenres, original_language, setoriginal_language, year, setYear, setSortBy }: FilterListProps) {
    const sortByGiven = (key: string) => () => {
        console.log(key);
        setSortBy(key);
    }
    return (
        <section className="filters-section">
            <div className='filters'>
                <label htmlFor="year">Year:</label>
                <input type="number" value={year} onChange={(e) => {
                    setYear(e.target.value)
                }} />
                <label htmlFor="search">Search:</label>
                <input type="text" value={search} onChange={(e) => {
                    setSearch(e.target.value)
                }} />
                <label htmlFor="genre">Genres:</label>
                <select multiple value={genres} onChange={(e) => setGenres(Array.from(e.target.selectedOptions, option => option.value))}>
                    <option value="all">All</option>
                    <option value="action">Action</option>
                    <option value="comedy">Comedy</option>
                    <option value="drama">Drama</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                </select>
                <label htmlFor="">Language:</label>
                <select value={original_language} onChange={(e) => setoriginal_language(e.target.value)}>
                    <option value="all">All</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                </select>
            </div>
            <div className="sortby">
                <button onClick={sortByGiven("title")}>Sort by Title</button>
                <button onClick={sortByGiven("release_date")}>Sort by Release Date</button>
                <button onClick={sortByGiven("vote_average")}>Sort by Rating</button>
                <button onClick={sortByGiven("revert")}> Revert Changes</button>
            </div>
        </section >
    );
}
