import { AuthProvider } from "@/Services/Auth.tsx";
import { BrowserRouter } from "react-router-dom";
import "@css/App.css";
import { DoggrRouter } from "@/DoggrRoutes.tsx";

//export const UserContext = createContext(null);

// This is our base React Component
export function App() {
	/*
	const auth = getAuth(firebaseApp);
	const [currentUser, setCurrentUser] = useState(null);

	onAuthStateChanged(auth, async (user) => {
		// don't set the user all the time, only when sign in changes
		if (user && !currentUser) {
			setCurrentUser(user);
		} else if(!user && currentUser) {
			setCurrentUser(user);
		}
	});*/

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


