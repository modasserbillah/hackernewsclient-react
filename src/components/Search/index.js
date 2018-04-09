import React from 'react';

const Search = ( { value, onChange, onSubmit, children } ) =>
    <form onSubmit={onSubmit}>

        <input
              type="text"
              value={value}
              onChange={onChange}
        />
        <button type="submit">
            { children }
        </button>
    </form>


// const isSearched = (searchTerm) => (item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

export default Search;
