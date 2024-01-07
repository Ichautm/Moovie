import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addWatchList } from "../../services/watchListMovies";
import { QueryObserverResult } from "@tanstack/react-query";
import { useState } from "react";
import { MovieCardProps } from "types/MovieCard/MovieCardType";
import { Link } from "react-router-dom";

interface WatchListCardProps {
	movieProps: MovieCardProps;
	refetchData: () => Promise<QueryObserverResult<MovieCardProps[], Error>>;
}

function WatchListCard({ movieProps, refetchData }: WatchListCardProps) {
	const [isSaved, setIsSaved] = useState(true);

	const posterUrl = `https://image.tmdb.org/t/p/original/${movieProps.poster_path}`;
	const releaseYear = movieProps.release_date?.slice(0, 4);

	const handleSave = async (id: number) => {
		setIsSaved(!isSaved);
		await addWatchList(id, !isSaved);
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
					{isSaved ? (
						<button
							onClick={() => handleSave(movieProps.id)}
							className="btn btn-ghost btn-circle"
						>
							<FontAwesomeIcon icon={solid("bookmark")} />
						</button>
					) : (
						<button
							onClick={() => handleSave(movieProps.id)}
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

export default WatchListCard;
