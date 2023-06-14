import { httpClient } from "@/Services/HttpClient.tsx";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const GalleryService = {
	async send(user: number) {
		const config = {
			method: 'search',  // Specify your method here
			url: serverUrl + "/gallery",
			data: {user}
		};
		const res = await httpClient.request(config);
		console.log(res.data);
		const gallery = res.data.map((gif) => gif.gifUri);
		const names = res.data.map((gif) => gif.name);
		const ids = res.data.map((gif) => gif.id);
		return { gallery, names, ids };
	}
};
