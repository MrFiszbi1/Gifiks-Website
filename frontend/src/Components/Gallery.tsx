import "@css/DoggrStyles.css";
import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { getNextProfileFromServer } from "@/Services/HttpClient.tsx";
import { GalleryService } from "@/Services/GalleryService.tsx";
import { response } from "msw";


export function Gallery() {
	const auth = useAuth();
	const minioUrl = "http://localhost:9000/doggr/";
	const [name, setName] = useState("No name set");
	const [gallery, setGallery] = useState([]);
	const [names, setNames] = useState([]);

	useEffect(() => {
		GalleryService.send(auth.userId)
			.then((res) => {
				console.log(res);
				setGallery(res.gallery);
				setNames(res.names);
				console.log(gallery);
				console.log(name);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className={"flex flex-row items-center rounded-box bg-slate-700 w-4/5 mx-auto"}>
			{gallery.map((gif, index) => (
				<div key={gif} className={"flex flex-col items-center bg-slate-700 w-4/5 mx-auto"}>
					<img className="rounded w-128 h-128" src={minioUrl + gif} alt="gif from user gallery." />
					<h2 className={"text-4xl text-blue-600"}>{names[index]}</h2>
				</div>
			))}
		</div>
	);
}
