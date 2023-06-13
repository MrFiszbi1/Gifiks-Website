import { httpClient } from "@/Services/HttpClient.tsx";

export const DeleteService = {
	async send(id: number) {
		return httpClient.delete("/gallary", { data: { gif_id: id } });
	}
};
