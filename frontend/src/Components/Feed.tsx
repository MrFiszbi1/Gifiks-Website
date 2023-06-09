import "@css/DoggrStyles.css";
import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { FeedService } from "@/Services/FeedService.tsx";


export function Feed() {
	const auth = useAuth();
	const minioUrl = "http://localhost:9000/doggr/";
	const [name, setName] = useState("No name set");
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
				console.log(name);
				console.log(dates);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<div className="mx-auto">
			<h1 className="text-4xl font-bold mb-8 text-center">Gif Feed Page</h1>
			<div className="grid grid-cols-1 gap-4 mx-auto w-2/5">
				{gallery.map((gif, index) => (
					<div
						key={gif}
						className="flex flex-col items-center bg-slate-700 rounded border border-gray-500 p-4 mx-2"
					>
						<h2 className="text-1xl text-blue-600 m-0">Uploaded by: {uploaderName[index]}</h2>
						<img
							className="rounded"
							src={minioUrl + gif}
							alt="gif from user gallery."
							style={{ width: "400px", height: "400px" }}
						/>
						<p className="text-blue-600 m-0"> uploaded at {dates[index]}</p>
						<h2 className="text-4xl text-blue-600 m-0">{names[index]}</h2>
					</div>
				))}
			</div>
		</div>
	);
}
