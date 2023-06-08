import { httpClient } from "@/Services/HttpClient.tsx";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://${serverIP}:${serverPort}`;

export const UserProfileService = {
	async send(id: number) {
		const config = {
			method: 'search',  // Specify your method here
			url: serverUrl + "/users",
			data: {id}
		};

		const profile = await httpClient.request(config);
		console.log(profile.data);
		return profile;
	}
};
