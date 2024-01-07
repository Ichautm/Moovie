import { useQuery } from "@tanstack/react-query";
import createRequestToken from "../../src/auth/createRequestToken";
import NowPlayingList from "../components/Home/NowPlayingList";
import TopRatedList from "../components/Home/TopRatedList";
import { Link, useLocation } from "react-router-dom";
import createAccessToken from "../../src/auth/createAccessToken";
import { useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import AuthButton from "../../src/components/Home/AuthButton";

function Home() {
	const location = useLocation();
	const queryParams = queryString.parse(location.search);

	const { data: requestToken } = useQuery({
		queryKey: ["CreateRequestToken"],
		queryFn: () => createRequestToken(),
	});

	const [reqToken, setReqToken] = useState("");

	useEffect(() => {
		if (requestToken && !queryParams.approved) {
			localStorage.setItem("request_token", requestToken.request_token);
			return;
		}
		if (queryParams.approved) {
			const apprRequestToken = localStorage.getItem("request_token");
			setReqToken(apprRequestToken ?? "");
		}
	}, [queryParams.approved, requestToken]);

	const { data: accessToken } = useQuery({
		queryKey: ["CreateAccessToken", reqToken],
		queryFn: () => createAccessToken(reqToken),
		enabled: !!reqToken,
	});

	useEffect(() => {
		if (accessToken?.access_token) {
			localStorage.setItem("access_token", accessToken.access_token);
		}
	}, [accessToken?.access_token]);

	const accessTokenLS = useMemo(() => {
		if (accessToken?.access_token) {
			return accessToken.access_token;
		}
		return localStorage.getItem("access_token");
	}, [accessToken?.access_token]);

	useEffect(() => {
		if (!accessTokenLS) {
			document.body.style.overflow = "hidden";
			return;
		}
		document.body.style.overflowY = "visible";
	}, [accessTokenLS]);

	return accessTokenLS ? (
		<div className="p-10 md:px-20 md:py-10">
			<NowPlayingList />
			<div className="my-20" />
			<TopRatedList />
		</div>
	) : (
		<div>
			<div className="flex justify-center items-center z-20 bg-red-200 bg-opacity-15 backdrop-blur-sm h-screen w-screen absolute">
				<Link
					to={`https://www.themoviedb.org/auth/access?request_token=${requestToken?.request_token}`}
				>
					<AuthButton />
				</Link>
			</div>
			<div className="px-20 py-10">
				<NowPlayingList />
				<div className="my-20" />
				<TopRatedList />
			</div>
		</div>
	);
}

export default Home;
