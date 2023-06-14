import "@css/DoggrStyles.css";
import { useEffect, useState } from "react";
import { FeedService } from "@/Services/FeedService.tsx";


export function Feed() {
	const minioUrl = "http://localhost:9000/doggr/";
	const [gallery, setGallery] = useState([]);
	const [names, setNames] = useState([]);
	const [dates, setDates] = useState([]);
	const [uploaderName, setUploaderName] = useState([]);

	useEffect(() => {
		FeedService.send()
			.then((res) => {
				console.log(res);
				setGallery(res.gallery);
				setNames(res.names.map((name) => name.replace(/_/g, " ")));
				setDates(res.dates);
				setUploaderName(res.uploaderName);
				console.log(gallery);
				console.log(names);
				console.log(dates);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className="mx-auto">
			<h1 className="text-4xl font-bold mb-2 text-center">Gif Feed Page</h1>
			<h3 className="text-2xl font-bold text-center mb-3">This is a random set of gifs uploaded by diffrent users, Enjoy!</h3>
			<div className="grid grid-cols-1 gap-4 mx-auto w-2/5">
				{gallery.map((gif, index) => (
					<div
						key={gif}
						className="bg-primary flex flex-col items-center rounded border p-4 mx-2"
					>
						<h2 className="text-2xl m-0">Uploaded by: {uploaderName[index]}</h2>
						<img
							className="rounded mt-3"
							src={minioUrl + gif}
							alt="gif from user gallery."
							style={{ width: "600px", height: "400px" }}
						/>
						<p className="m-0"> uploaded at {dates[index]}</p>
						<h2 className="text-4xl m-0">{names[index]}</h2>
					</div>
				))}
			</div>
			<h3 className="text-2xl font-bold my-4 text-center">End of Feed. If you wish to view a different set of gifs refresh the page</h3>
		</div>
	);
}
