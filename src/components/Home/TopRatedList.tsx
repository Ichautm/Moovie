import getTopRatedList from "../../services/getTopRatedList";
import MovieCard from "../Movie/MovieCard";
import { useQuery } from "@tanstack/react-query";

function TopRatedList() {
	const { data } = useQuery({
		queryKey: ["TopRatedList"],
		queryFn: () => getTopRatedList(),
	});

	return (
		<div>
			<h1 className="font-semibold mb-6 text-2xl lg:text-start lg:text-5xl">
				Top Rated
			</h1>
			<div className="flex justify-center items-center md:block">
				<div className="grid grid-cols-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-10">
					{data?.map((items) => (
						<MovieCard key={items.id} {...items} />
					))}
				</div>
			</div>
		</div>
	);
}

export default TopRatedList;
