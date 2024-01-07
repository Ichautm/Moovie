import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieHeader, MovieImage } from "./styles";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useParams } from "react-router-dom";
import MovieCard from "../MovieCard";
import { useQuery } from "@tanstack/react-query";
import getMovieDetail from "../../../services/getMovieDetail";
import { Fragment, useEffect, useState } from "react";
import getRecommendation from "../../../services/getRecommendations";
import { addFavorite, getFavorite } from "../../../services/favoriteMovie";
import { getWatchList } from "../../../services/watchListMovies";

function MovieDetail() {
	const { id: movie_id } = useParams();

	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	const { data: movieDetailData } = useQuery({
		queryKey: ["MovieDetail", movie_id],
		queryFn: () => getMovieDetail(Number(movie_id)),
	});

	const { data: favoriteMovies } = useQuery({
		queryKey: ["GetFavoriteMovie"],
		queryFn: () => getFavorite(),
	});

	const { data: watchListMovies } = useQuery({
		queryKey: ["GetWatchList"],
		queryFn: () => getWatchList(),
	});

	const { data: recommendation } = useQuery({
		queryKey: ["MovieRecommendation", movie_id],
		queryFn: () => getRecommendation(Number(movie_id)),
	});

	const handleFavorite = (id: number) => {
		setIsLiked(!isLiked);
		addFavorite(id, !isLiked);
	};

	const moviePoster = `https://image.tmdb.org/t/p/original/${movieDetailData?.poster_path}`;
	const backdropPath = `https://image.tmdb.org/t/p/original/${movieDetailData?.backdrop_path}`;
	const roundScore =
		Math.round(movieDetailData ? movieDetailData.vote_average * 100 : 0) / 100;

	useEffect(() => {
		favoriteMovies?.forEach((item) => {
			if (item.id === movieDetailData?.id) {
				setIsLiked(true);
			}
		});
		watchListMovies?.forEach((item) => {
			if (item.id === movieDetailData?.id) {
				setIsSaved(true);
			}
		});
	}, [favoriteMovies, movieDetailData?.id, movie_id, watchListMovies]);

	return (
		<div>
			<MovieHeader className="flex p-4 lg:p-10" bgImage={backdropPath}>
				<div className="flex flex-col lg:flex-row justify-center items-center z-20 lg:space-x-10">
					<MovieImage src={moviePoster} />
					<div>
						<div className="flex flex-col lg:flex-row items-center mt-3 lg:mt-0">
							<h1 className="font-bold text-lg lg:text-start lg:text-5xl lg:mr-3">
								{movieDetailData?.title}
							</h1>
							<h1 className="text-lg text-center lg:text-start lg:text-5xl">
								(2023)
							</h1>
						</div>
						<div className="flex items-center mt-5 space-x-2">
							<p>{movieDetailData?.release_date}</p>
							<p>•</p>
							{movieDetailData?.genres.map((genre, index) => (
								<Fragment key={index}>
									<p>{genre.name}</p>
									{index < movieDetailData.genres.length - 1 && ", "}
								</Fragment>
							))}
							<p>•</p>
							<p>{movieDetailData?.runtime} minutes</p>
						</div>
						<div className="flex items-center my-5 space-x-2">
							<div className="flex items-center space-x-2">
								<div className="bg-white border-2 border-blue-800 rounded-full p-2">
									<p className="text-blue-800 font-semibold text-xl">
										{roundScore}
									</p>
								</div>
								<p>User Score</p>
							</div>
							<div>
								{isSaved ? (
									<button
										onClick={() => setIsSaved(!isSaved)}
										className="btn btn-ghost btn-circle"
									>
										<FontAwesomeIcon icon={solid("bookmark")} />
									</button>
								) : (
									<button
										onClick={() => setIsSaved(!isSaved)}
										className="btn btn-ghost btn-circle"
									>
										<FontAwesomeIcon icon={regular("bookmark")} />
									</button>
								)}
								{isLiked ? (
									<button
										onClick={() =>
											handleFavorite(movieDetailData?.id ?? Number(movie_id))
										}
										className="btn btn-ghost btn-circle"
									>
										<FontAwesomeIcon icon={solid("heart")} />
									</button>
								) : (
									<button
										onClick={() =>
											handleFavorite(movieDetailData?.id ?? Number(movie_id))
										}
										className="btn btn-ghost btn-circle"
									>
										<FontAwesomeIcon icon={regular("heart")} />
									</button>
								)}
							</div>
						</div>
						<div className="space-y-2">
							<p className="font-semibold">Overview</p>
							<p>{movieDetailData?.overview}</p>
						</div>
					</div>
				</div>
			</MovieHeader>
			{recommendation && (
				<div className="mt-2 lg:mt-10 p-10 md:px-20 md:py-10">
					<h1 className="font-semibold mb-6 text-2xl lg:text-start lg:text-5xl">
						Recommendations
					</h1>
					<div className="overflow-x-auto scrollbar">
						<div className="flex space-x-6 pb-4">
							{recommendation.map((items) => (
								<MovieCard key={items.id} {...items} />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default MovieDetail;
