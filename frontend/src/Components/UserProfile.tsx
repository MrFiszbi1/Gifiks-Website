import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { UserProfileService } from "@/Services/UserProfileService.tsx";
import "@css/DoggrStyles.css";
import { Profile } from "@/Components/Profile.tsx";

export function UserProfile() {
	const auth = useAuth();
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [gifUri, setGifUri] = useState("");

	const fetchProfile = () => {
		UserProfileService.send(auth.userId)
			.then((res) => {
				console.log(res);
				setName(res.data.name);
				setBio(res.data.bio);
				setGifUri(res.data.gifUri);
				console.log(gifUri);
			})
			.catch( (err) => console.log("Error in fetch profile", err));
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	useEffect(() => {
		console.log("-- User Profile rerenders --");
	});

	return (
		<Profile
		gifUri={gifUri}
		name={name}
		bio={bio}
		/>
	);
}
