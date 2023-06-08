import { useAuth } from "@/Services/Auth.tsx";
import { Link } from "react-router-dom";

export function NavBar() {
	const auth = useAuth();

	return (
		<nav className="bg-blue-800 rounded-b shadow-lg mb-4">
			<div className="navbar justify-center">
				<div className={"navbar-center lg:flex"}>

					<ul className={"menu menu-horizontal"}>
						<li><Link to="/" className="nav-link text-white mr-4 no-underline">Home</Link></li>
						<li><Link to="/match" className="nav-link text-white mr-4 no-underline"> Match</Link></li>
						<li><Link to="/gallery" className="nav-link text-white mr-4 no-underline"> Gallery</Link></li>
						<li><Link to="/upload" className="nav-link text-white mr-4 no-underline"> Upload</Link></li>
						<li><Link to="/profile" className="nav-link text-white mr-4 no-underline"> Profile</Link></li>
						{auth?.token != null ? (
							<li><Link to="/logout" className="nav-link text-white mr-4 no-underline">Logout</Link></li>
						) : (
							<>
								<li><Link to="/login" className="nav-link text-white mr-4 no-underline"> Login</Link></li>
								<li><Link to="/create" className="nav-link text-white mr-4 no-underline"> Create Account</Link> </li>
							</>
						)}</ul>

				</div>
			</div>
		</nav>

	);
}
