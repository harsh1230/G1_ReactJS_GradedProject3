import React from "react";

const Search = (props) => {

	const el = (

		<div className="col col-sm-4">
			<input className="form-control" value={props.value} onChange={(event) => props.setSearchValue(event.target.value)} placeholder="Type to search..." />
		</div>
	);

	return el;

};

export default Search;
