import React from "react";

const MovieListHeading = (props) => {

	const el = (

		<div className="col pl-1">
			<h5>{props.heading}</h5>
		</div>
	);

	return el;

};

export default MovieListHeading;
