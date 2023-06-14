import { useAuth } from "@/Services/Auth.tsx";
import { Link } from "react-router-dom";

export function NavBar() {
	const auth = useAuth();

	return (
		<nav className="bg-primary rounded-b shadow-lg mb-4">
			<div className="navbar justify-between">
				<div className="navbar-left">
					<ul className="menu menu-horizontal flex items-center">
						<li><Link to="/" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Home</Link></li>
						<li><Link to="/feed" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Feed</Link></li>
						<li><Link to="/match" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Match</Link></li>
						<li><Link to="/gallery" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Gallery</Link></li>
						<li><Link to="/upload" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Upload</Link></li>
						<li><Link to="/allprofiles" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Users</Link></li>
						<li><Link to="/profile" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Profile</Link></li>
					</ul>
				</div>

				<div className="navbar-right">
					<ul className="menu menu-horizontal flex items-center">
						{auth?.token != null ? (
							<li><Link to="/logout" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Logout</Link></li>
						) : (
							<>
								<li><Link to="/login" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Login</Link></li>
								<li><Link to="/create" className="nav-link text-white mr-4 no-underline hover:bg-neutral">Create Account</Link></li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
