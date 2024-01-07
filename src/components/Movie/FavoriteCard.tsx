import { useState } from "react";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addFavorite } from "../../services/favoriteMovie";
import { MovieCardProps } from "types/MovieCard/MovieCardType";
import { Link } from "react-router-dom";
import { QueryObserverResult } from "@tanstack/react-query";

interface FavoriteCardProps {
	movieProps: MovieCardProps;
	refetchData: () => Promise<QueryObserverResult<MovieCardProps[], Error>>;
}

function FavoriteCard({ movieProps, refetchData }: FavoriteCardProps) {
	const [isLiked, setIsLiked] = useState(true);

	const posterUrl = `https://image.tmdb.org/t/p/original/${movieProps.poster_path}`;
	const releaseYear = movieProps.release_date?.slice(0, 4);

	const handleFavorite = async (id: number) => {
		setIsLiked(!isLiked);
		await addFavorite(id, !isLiked);
		await refetchData();
	};

	return (
		<div className="card card-compact w-64 p-0 bg-base-100 shadow-xl flex-shrink-0">
			<figure>
				<Link to={`/movie-detail/${movieProps.id}`}>
					<img src={posterUrl} alt={movieProps.title} />
				</Link>
			</figure>
			<div className="card-body justify-between">
				<Link to={`/movie-detail/${movieProps.id}`}>
					<h2 className="card-title">{movieProps.title}</h2>
					<p className="text-start">{releaseYear}</p>
				</Link>
				<div className="card-actions justify-end">
					{isLiked ? (
						<button
							onClick={() => handleFavorite(movieProps.id)}
							className="btn btn-ghost btn-circle"
						>
							<FontAwesomeIcon icon={solid("heart")} />
						</button>
					) : (
						<button
							onClick={() => handleFavorite(movieProps.id)}
							className="btn btn-ghost btn-circle"
						>
							<FontAwesomeIcon icon={regular("heart")} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default FavoriteCard;
