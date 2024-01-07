import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MovieCardProps } from "types/MovieCard/MovieCardType";
import WatchListCard from "../components/Movie/WatchListCard";
import { getWatchList } from "../services/watchListMovies";

function WatchList() {
	const navigate = useNavigate();
	const [favoriteMovies, setFavoriteMovies] = useState<MovieCardProps[]>([]);

	const { data, refetch: refetchData } = useQuery({
		queryKey: ["GetWatchList"],
		queryFn: () => getWatchList(),
	});

	useEffect(() => {
		if (!localStorage.getItem("access_token")) {
			navigate("/");
		}
		if (data) {
			setFavoriteMovies(data);
			return;
		}
	}, [data, navigate]);

	return (
		<div className="p-10 md:px-20 md:py-10">
			<h1 className="font-semibold mb-6 text-start">Your Watch List</h1>
			<div className="md:grid-cols-3 grid xl:grid-cols-6 gap-x-4 gap-y-10">
				{favoriteMovies?.map((items) => (
					<WatchListCard
						key={items.id}
						movieProps={items}
						refetchData={() => refetchData()}
					/>
				))}
			</div>
		</div>
	);
}

export default WatchList;
