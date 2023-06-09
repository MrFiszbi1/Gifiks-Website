import { httpClient } from "@/Services/HttpClient.tsx";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const FeedService = {
	async send() {
		const res = await httpClient.get("/feed");
		console.log(res.data);
		const gallery = res.data.map((gif) => gif.gifUri);
		const names = res.data.map((gif) => gif.name);
		const dates = res.data.map((gif) => {
			const date = gif.created_at.split('T');
			return date[0];
		});
		const uploaderName = res.data.map((gif) => gif.uploaderName);
		return { gallery, names, dates, uploaderName };
	}
};
