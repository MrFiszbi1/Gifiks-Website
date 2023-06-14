import { httpClient } from "@/Services/HttpClient.tsx";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const AllProfilesService = {
	async send() {
		const profiles = await httpClient.get("/users");
		console.log(profiles.data);
		const gifUris = [];
		const names = [];
		const bios = [];

		profiles.data.forEach((profile) => {
			const { gifUri, name, bio } = profile;
			gifUris.push(gifUri);
			names.push(name);
			bios.push(bio);
		});

		return { bios, names, gifUris};
	}
};
