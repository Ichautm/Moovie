import MovieCard from "../Movie/MovieCard";
import { useQuery } from "@tanstack/react-query";
import getNowPlayingList from "../../services/getNowPlayingList";

function NowPlayingList() {
	const { data } = useQuery({
		queryKey: ["NowPlayingList"],
		queryFn: () => getNowPlayingList(),
	});

	return (
		<div>
			<h1 className="font-semibold mb-6 text-2xl lg:text-start lg:text-5xl">
				Now Playing
			</h1>
			<div className="overflow-x-auto scrollbar">
				<div className="flex space-x-6 pb-4">
					{data?.map((items) => (
						<MovieCard key={items.id} {...items} />
					))}
				</div>
			</div>
		</div>
	);
}

export default NowPlayingList;
