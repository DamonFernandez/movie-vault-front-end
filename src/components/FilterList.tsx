import { FilterListProps } from "../types";
export default function FilterList({
  search,
  setSearch,
  genre,
  setGenre,
  original_language,
  setoriginal_language,
  year,
  setYear,
  setSortBy,
}: FilterListProps) {
  const sortByGiven = (key: string) => () => {
    setSortBy(key);
  };
  return (
    <div className="FiltersTab">
      <div className="filters">
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
          }}
        />
        Search:
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        Genres:
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="romance">Romance</option>
        </select>
        Language
        <select
          value={original_language}
          onChange={(e) => setoriginal_language(e.target.value)}
        >
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
        <button>Sort by Release Date</button>
        <button>Sort by Rating</button>
      </div>
    </div>
  );
}
