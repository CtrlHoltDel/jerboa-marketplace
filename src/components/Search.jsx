import React, { useState } from "react";

const Search = () => {
  const [currSearch, setCurrSearch] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(currSearch);
  };

  const onChange = (e) => {
    console.log(e.target.value);
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
