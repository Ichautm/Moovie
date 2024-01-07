import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addFavorite, getFavorite } from "../../services/favoriteMovie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieCardProps } from "types/MovieCard/MovieCardType";
import { useQuery } from "@tanstack/react-query";
import { addWatchList, getWatchList } from "../../services/watchListMovies";

function MovieCard({ id, poster_path, title, release_date }: MovieCardProps) {
	const { data: favoriteMovies } = useQuery({
		queryKey: ["GetFavoriteMovie"],
		queryFn: () => getFavorite(),
	});

	const { data: watchListMovies } = useQuery({
		queryKey: ["GetWatchList"],
		queryFn: () => getWatchList(),
	});

	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const posterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
	const releaseYear = release_date?.slice(0, 4);

	const handleFavorite = (id: number) => {
		setIsLiked(!isLiked);
		addFavorite(id, !isLiked);
	};

	const handleSave = (id: number) => {
		setIsSaved(!isSaved);
		addWatchList(id, !isSaved);
	};

	useEffect(() => {
		favoriteMovies?.forEach((item) => {
			if (item.id === id) {
				setIsLiked(true);
			}
		});
		watchListMovies?.forEach((item) => {
			if (item.id === id) {
				setIsSaved(true);
			}
		});
	}, [favoriteMovies, id, watchListMovies]);

	return (
		<div className="card card-compact w-72 lg:w-64 p-0 bg-base-100 shadow-xl flex-shrink-0">
			<figure>
				<Link to={`/movie-detail/${id}`}>
					<img src={posterUrl} alt={title} />
				</Link>
			</figure>
			<div className="card-body justify-between">
				<Link to={`/movie-detail/${id}`}>
					<h2 className="card-title">{title}</h2>
					<p className="text-start">{releaseYear}</p>
				</Link>
				<div className="card-actions justify-end">
					{isLiked ? (
						<button
							onClick={() => handleFavorite(id)}
							className="btn btn-ghost btn-circle"
						>
							<FontAwesomeIcon icon={solid("heart")} />
						</button>
					) : (
						<button
							onClick={() => handleFavorite(id)}
							className="btn btn-ghost btn-circle"
						>
							<FontAwesomeIcon icon={regular("heart")} />
						</button>
					)}
					{isSaved ? (
						<button
							onClick={() => handleSave(id)}
							className="btn btn-ghost btn-circle"
						>
							<FontAwesomeIcon icon={solid("bookmark")} />
						</button>
					) : (
						<button
							onClick={() => handleSave(id)}
							className="btn btn-ghost btn-circle"
						>
							<FontAwesomeIcon icon={regular("bookmark")} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default MovieCard;
