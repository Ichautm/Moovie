import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoutSession from "../../auth/logoutSession";

function Navbar() {
	const accessTokenLS = useMemo(() => {
		return localStorage.getItem("access_token");
	}, []);

	const navigate = useNavigate();

	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = () => {
		navigate(`/search?query=${searchQuery}`);
	};

	const handleLogout = () => {
		logoutSession(accessTokenLS ?? "");
		localStorage.removeItem("access_token");
		navigate("/");
		location.reload();
	};

	return (
		<div className="drawer drawer-end z-20">
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				<div
					className="navbar p-3 lg:px-7 lg:py-5 flex justify-between"
					style={{ backgroundColor: "#1F2D5A" }}
				>
					<div>
						<Link to="/">
							<img
								src="/images/logo.png"
								alt="logo"
								width={100}
								height="auto"
							/>
						</Link>
					</div>
					<div className="flex-none lg:hidden">
						<label
							htmlFor="my-drawer-3"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost text-lg"
						>
							<FontAwesomeIcon icon={solid("bars")} />
						</label>
					</div>
					<div className="flex-none hidden lg:flex">
						<div className="form-control">
							<input
								type="text"
								className="input input-bordered w-24 md:w-auto bg-white text-black"
								placeholder="Search"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>
						<ul className="hidden lg:flex show menu menu-horizontal px-1 items-center">
							<li>
								<Link to="/favorites">Favorite</Link>
							</li>
							<li>
								<Link to="/watch-list">Watchlist</Link>
							</li>
							<li>
								<button onClick={() => handleLogout()}>
									<FontAwesomeIcon icon={solid("right-from-bracket")} />
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="drawer-side overflow-x-hidden">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul
					className="menu p-4 w-80 min-h-full"
					style={{ backgroundColor: "#1F2D5A" }}
				>
					<li>
						<div className="form-control">
							<input
								type="text"
								className="input input-bordered w-full md:w-auto bg-white text-black"
								placeholder="Search"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
						</div>
					</li>
					<li>
						<Link to="/favorites">Favorite</Link>
					</li>
					<li>
						<Link to="/watch-list">Watchlist</Link>
					</li>
					<li>
						<button className="flex" onClick={() => handleLogout()}>
							Logout
							<FontAwesomeIcon icon={solid("right-from-bracket")} />
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
