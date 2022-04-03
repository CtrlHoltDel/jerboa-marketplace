import React, { useState } from "react";

const Search = () => {
  const [currSearch, setCurrSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setCurrSearch(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" onChange={onChange} value={currSearch} />
      <button>Search</button>
    </form>
  );
};

export default Search;
