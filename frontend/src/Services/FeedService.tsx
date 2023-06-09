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
		return { gallery, names };
	}
};
