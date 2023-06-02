import { AuthProvider } from "@/Services/Auth.tsx";
import { BrowserRouter } from "react-router-dom";
import "@css/App.css";
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


