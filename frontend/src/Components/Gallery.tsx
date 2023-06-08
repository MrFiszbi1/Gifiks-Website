import "@css/DoggrStyles.css";
import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { GalleryService } from "@/Services/GalleryService.tsx";


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
				setNames(res.names.map((name) => name.replace(/_/g, " ")));
				console.log(gallery);
				console.log(name);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className="mx-auto">
			<h1 className="text-4xl font-bold mb-8 text-center">User's Gif Gallery</h1>
			<div className="grid grid-cols-2 gap-4 mx-auto">
				{gallery.map((gif, index) => (
					<div
						key={gif}
						className="flex flex-col items-center bg-slate-700 rounded border border-gray-500 p-4 mx-2"
					>
						<img
							className="rounded"
							src={minioUrl + gif}
							alt="gif from user gallery."
							style={{ width: "400px", height: "400px" }}
						/>
						<h2 className="text-4xl text-blue-600">{names[index]}</h2>
					</div>
				))}
			</div>
		</div>
	);
}
