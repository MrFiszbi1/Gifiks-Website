import { Home } from "@/Components/HomePage.tsx";
import { Login } from "@/Components/Login.tsx";
import { AuthProvider } from "@/Services/Auth.tsx";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import "@css/App.css";
import { Match } from "@/Components/Match.tsx";

// This is our base React Component
export function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="App">
					<nav>
						<div className="menu">
							<Link to="/">Home</Link> ||
							<Link to="/match"> Match</Link> ||
							<Link to="/login"> Login</Link>
						</div>
					</nav>

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/match" element={<Match />} />
						<Route path="/login" element={<Login />} />
					</Routes>

				</div>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;


