import "@css/DoggrStyles.css";
import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { UserProfileService } from "@/Services/UserProfileService.tsx";
import { Profile } from "@/Components/Profile.tsx";
import { AllProfilesService } from "@/Services/AllProfilesService.tsx";


export function AllProfiles() {
	const [names, setName] = useState([]);
	const [bios, setBio] = useState([]);
	const [gifUris, setGifUri] = useState([]);

	const fetchProfile = () => {
		AllProfilesService.send()
			.then((res) => {
				console.log(res);
				setName(res.names);
				setBio(res.bios);
				setGifUri(res.gifUris);
				console.log(names);
				console.log(bios);
				console.log(gifUris);
			})
			.catch( (err) => console.log("Error in fetch profile", err));
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	useEffect(() => {
		console.log("-- Other Profiles rerenders --");
	});

	return (
		<div className="mx-auto">
			<h1 className="text-4xl font-bold mb-2 text-center">All User Profiles</h1>
			<h3 className="text-2xl font-bold text-center mb-3">Check out all the users on Gifiks</h3>
			<div className="grid grid-cols-1 gap-4 mx-auto w-full">
				{names.map((name, index) => (
					<Profile
						gifUri={gifUris[index]}
						name={name}
						bio={bios[index]}
					/>
				))}
			</div>
			<h3 className="text-2xl font-bold my-4 text-center">No more users</h3>
		</div>
	);
}
