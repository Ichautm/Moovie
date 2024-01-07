import { ReactNode, useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { useLocation } from "react-router";
import createAccessToken from "../../auth/createAccessToken";
import createRequestToken from "../../auth/createRequestToken";

function Layout({ children }: { children: ReactNode }) {
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

	return accessTokenLS ? (
		<div>
			<Navbar />
			<div>{children}</div>
		</div>
	) : (
		<div>{children}</div>
	);
}

export default Layout;
