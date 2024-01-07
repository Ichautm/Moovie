import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import WatchList from "./pages/watch-list";
import MovieDetail from "./components/Movie/MovieDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./pages/search";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/watch-list" element={<WatchList />} />
						<Route path="/movie-detail/:id" element={<MovieDetail />} />
						<Route path="/search" element={<Search />} />
					</Routes>
				</Layout>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
