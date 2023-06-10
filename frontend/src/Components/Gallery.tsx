import "@css/DoggrStyles.css";
import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { GalleryService } from "@/Services/GalleryService.tsx";


export function Gallery() {
	const auth = useAuth();
	const minioUrl = "http://localhost:9000/doggr/";
	const [gallery, setGallery] = useState([]);
	const [names, setNames] = useState([]);

	useEffect(() => {
		GalleryService.send(auth.userId)
			.then((res) => {
				console.log(res);
				setGallery(res.gallery);
				setNames(res.names.map((name) => name.replace(/_/g, " ")));
				console.log(gallery);
				console.log(names);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className="mx-auto mb-3">
			<h1 className="text-4xl font-bold mb-8 text-center">User's Gif Gallery</h1>
			<div className="grid grid-cols-3 gap-4 mx-auto">
				{gallery.map((gif, index) => (
					<div
						key={gif}
						className="bg-primary  flex flex-col items-center rounded border p-4 mx-2"
					>
						<img
							className="rounded"
							src={minioUrl + gif}
							alt="gif from user gallery."
							style={{ width: "400px", height: "400px" }}
						/>
						<h2 className="text-4xl">{names[index]}</h2>
					</div>
				))}
			</div>
		</div>
	);
}
