import { useAuth } from "@/Services/Auth.tsx";
import { useContext, useEffect, useState } from "react";
import initialState, { getRandomProfile } from "../InitialState";
import { Profile } from "./Profile";
import { Title } from "./HomePage.tsx";

export function Match() {
	const [currentProfile, setCurrentProfile] = useState(initialState.currentProfile);
	const [likeHistory, setLikeHistory] = useState(initialState.likeHistory);
	const auth = useAuth();

	useEffect(() => {
		console.log("-- Match rerenders --");
	});

	const onLikeButtonClick = () => {
		// this keeps allocations and copies to a minimum
		const newLikeHistory = [...likeHistory, currentProfile];
		const newProfile = getRandomProfile();
		setCurrentProfile(newProfile);
		setLikeHistory(newLikeHistory);
		console.log("Added new liked profile");
	};

	const onPassButtonClick = () => {
		const newCurrentProfile = getRandomProfile();
		setCurrentProfile(newCurrentProfile);
	};

	const profile = (
		<Profile
			{...currentProfile}
			onLikeButtonClick={onLikeButtonClick}
			onPassButtonClick={onPassButtonClick}
		/>
	);

	return (
		<>
			<div>"MATCH PAGE"</div>
			<p> User logged in as {auth.token}</p>
			{profile}
		</>
	);
}

export default Match;
