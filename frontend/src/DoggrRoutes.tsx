import { CreateProfile } from "@/Components/CreateProfile.tsx";
import { Home } from "@/Components/HomePage.tsx";
import { Login } from "@/Components/Login.tsx";
import { Logout } from "@/Components/Logout.tsx";
import { Match } from "@/Components/Match.tsx";
import { NavBar } from "@/Components/Navigation.tsx";
import { ProfileProps } from "@/Components/Profile.tsx";
import { ProtectedRoute } from "@/Components/ProtectedRoute.tsx";
import { UserProfile } from "@/Components/UserProfile.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "@css/DoggrStyles.css";
import { Gallery } from "@/Components/Gallery.tsx";
import { UploadGif } from "@/Components/UploadGif.tsx";
import { Feed } from "@/Components/Feed.tsx";
import { AllProfiles } from "@/Components/AllProfiles.tsx";

export function DoggrRouter() {
	const auth = useAuth();

	const [currentProfile, setCurrentProfile ] = useState<ProfileProps>();

	return (
		<div className={"doggrfancy"}>
			<NavBar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/match" element={<ProtectedRoute><Match /></ProtectedRoute>} />
				<Route path="/create" element={<CreateProfile/>}/>
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
				<Route path="/upload" element={<ProtectedRoute><UploadGif /></ProtectedRoute>} />
				<Route path="/profile" element={<ProtectedRoute><UserProfile  /></ProtectedRoute>} />
				<Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
				<Route path="/allprofiles" element={<ProtectedRoute><AllProfiles /></ProtectedRoute>} />
			</Routes>
		</div>
	);
}
