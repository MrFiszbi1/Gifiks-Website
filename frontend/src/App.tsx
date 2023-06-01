import { Home } from "@/Components/HomePage.tsx";
import { Login } from "@/Components/Login.tsx";
import { AuthProvider } from "@/Services/Auth.tsx";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";
import "@css/App.css";
import { Match } from "@/Components/Match.tsx";
import { DoggrRouter } from "@/DoggrRoutes.tsx";

// This is our base React Component
export function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="App">
					<DoggrRouter/>
				</div>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;


