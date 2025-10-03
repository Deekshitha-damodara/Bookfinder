import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setBooks([]);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data.docs.slice(0, 20)); // first 20 results
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Finder</h1>
      <form onSubmit={handleSearch} className="flex mb-6 gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          placeholder="Search books by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {books.map((book) => (
          <div
            key={book.key}
            className="bg-white rounded shadow p-4 flex gap-4"
          >
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="w-20 h-28 object-cover rounded"
              />
            ) : (
              <div className="w-20 h-28 bg-gray-200 flex items-center justify-center rounded text-gray-400">
                No Cover
              </div>
            )}
            <div>
              <h2 className="font-semibold text-lg">{book.title}</h2>
              <div className="text-sm text-gray-600 mb-1">
                {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
              </div>
              <div className="text-xs text-gray-500">
                {book.first_publish_year
                  ? `First published: ${book.first_publish_year}`
                  : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!loading && books.length === 0 && query && !error && (
        <div className="text-center text-gray-500 mt-8">No books found.</div>
      )}
    </div>
  );
}

export default App;
