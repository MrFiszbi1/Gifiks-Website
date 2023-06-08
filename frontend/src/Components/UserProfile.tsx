import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { UserProfileService } from "@/Services/UserProfileService.tsx";
import "@css/DoggrStyles.css";

export function UserProfile() {
	const auth = useAuth();
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [gifUri, setGifUri] = useState("");

	const minioUrl = "http://localhost:9000/doggr/";


	const fetchProfile = () => {
		UserProfileService.send(auth.userId)
			.then((res) => {
				console.log(res);
				setName(res.data.name);
				setBio(res.data.bio);
				setGifUri(minioUrl+res.data.gifUri);
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
		<div className={"flex flex-col items-center rounded-box bg-slate-700 w-3/5 mx-auto"}>
			<img className="rounded w-128 h-128 mt-4" src={gifUri} alt="Profile gif" />
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			<div className={"text-2xl text-blue-300"}>User Bio: {bio}</div>
		</div>
	);
}
