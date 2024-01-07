import { useQuery } from "@tanstack/react-query";
import FavoriteCard from "../components/Movie/FavoriteCard";
import { getFavorite } from "../services/favoriteMovie";
import { useEffect, useState } from "react";
import { MovieCardProps } from "types/MovieCard/MovieCardType";
import { useNavigate } from "react-router";

function Favorites() {
	const navigate = useNavigate();
	const [favoriteMovies, setFavoriteMovies] = useState<MovieCardProps[]>([]);

	const { data, refetch: refetchData } = useQuery({
		queryKey: ["GetFavoriteMovie"],
		queryFn: () => getFavorite(),
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
			<h1 className="font-semibold mb-6 text-start">Your Favorite Movies</h1>
			<div className="md:grid-cols-3 grid xl:grid-cols-6 gap-x-4 gap-y-10">
				{favoriteMovies?.map((items) => (
					<FavoriteCard
						key={items.id}
						movieProps={items}
						refetchData={() => refetchData()}
					/>
				))}
			</div>
		</div>
	);
}

export default Favorites;
