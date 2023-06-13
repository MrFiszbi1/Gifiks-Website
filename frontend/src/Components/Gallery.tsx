import "@css/DoggrStyles.css";
import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { GalleryService } from "@/Services/GalleryService.tsx";
import { DeleteService } from "@/Services/DeleteService.tsx";


export function Gallery() {
	const auth = useAuth();
	const minioUrl = "http://localhost:9000/doggr/";
	const [ids, setIds] = useState([]);
	const [gallery, setGallery] = useState([]);
	const [names, setNames] = useState([]);

	const onDeleteGif = (id: number, index: number) => {
		console.log(`gif to delete: ${id}`);
		DeleteService.send(id)
			.then((res) => {
				console.log(res);
				// Create copies of the arrays
				const newIds = [...ids];
				const newGallery = [...gallery];
				const newNames = [...names];

				// Remove element at the specified index from the arrays using splice()
				newIds.splice(index, 1);
				newGallery.splice(index, 1);
				newNames.splice(index, 1);

				// Update the state with the modified arrays
				setIds(newIds);
				setGallery(newGallery);
				setNames(newNames);
			})
			.catch( (err) => console.log("Error in deleting fetch", err));

	};

	useEffect(() => {
		GalleryService.send(auth.userId)
			.then((res) => {
				console.log(res);
				setGallery(res.gallery);
				setNames(res.names.map((name) => name.replace(/_/g, " ")));
				setIds(res.ids);
				console.log(gallery);
				console.log(names);
				console.log(ids);
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
						className="bg-primary flex flex-col items-center rounded border p-4 mx-2"
					>
						<img
							className="rounded"
							src={minioUrl + gif}
							alt="gif from user gallery."
							style={{ width: "600px", height: "400px" }}
						/>
						<h2 className="text-4xl">{names[index]}</h2>
						<div>
							<button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-3" onClick={() => onDeleteGif(ids[index], index)}>Delete Gif</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
