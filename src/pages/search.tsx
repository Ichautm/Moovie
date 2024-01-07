import searchMovie from "../services/searchMovie";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useLocation } from "react-router";
import MovieCard from "../../src/components/Movie/MovieCard";

function Search() {
	const location = useLocation();
	const queryParams = queryString.parse(location.search);

	const { data: movies } = useQuery({
		queryKey: ["SearchMovie", queryParams.query],
		queryFn: () => searchMovie(queryParams?.query as string),
	});

	return (
		<div className="p-10 md:px-20 md:py-10">
			<div className="md:grid-cols-3 grid xl:grid-cols-6 gap-x-4 gap-y-10">
				{movies?.map((items) => (
					<MovieCard key={items.id} {...items} />
				))}
			</div>
		</div>
	);
}

export default Search;
