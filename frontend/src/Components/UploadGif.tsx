import "@css/DoggrStyles.css";
import { useAuth } from "@/Services/Auth.tsx";
import { useEffect, useState } from "react";
import { getNextProfileFromServer, httpClient } from "@/Services/HttpClient.tsx";
import { GalleryService } from "@/Services/GalleryService.tsx";
import { response } from "msw";

export enum SubmissionStatus {
	NotSubmitted,
	SubmitFailed,
	SubmitSucceeded
}


export function UploadGif() {
	const auth = useAuth();
	const [selectedFile, setSelectedFile] = useState();
	const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);

	const onFileChange = ev => {
		setSelectedFile(ev.target.files[0]);
	};

	const onUploadFile = (ev) => {
		const formData = new FormData();

		formData.append('uploader', auth.userId.toString());
		formData.append('file', selectedFile);

		// @ts-ignore
		formData.append("fileName", selectedFile.name);

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			}
		};

		httpClient.post("/uploadgif", formData, config)
			.then( (response) => {
				console.log("Got response from uploading a gif", response.status);
				if (response.status === 200) {
					setSubmitted(SubmissionStatus.SubmitSucceeded);
				} else {
					setSubmitted(SubmissionStatus.SubmitFailed);
				}
			});
	};

	return (
		<div className="mx-auto">
			<h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Upload a Gif to Your Gallery</h1>
			{
				submitted === SubmissionStatus.SubmitFailed &&
				<h3 className="text-red-500">UPLOAD GIF FAILED!</h3>
			}
			<div className="flex flex-col items-center bg-slate-700 w-4/5 mx-auto p-5 rounded-box">

				<div className="flex flex-col w-full mb-5">
					<label htmlFor="newGif" className="text-blue-300 mb-2">Upload a Gif:</label>
					<input
						type={"file"}
						className={"doggrFileUpload input input-bordered"}
						id={"newGif"}
						name="newGif"
						accept={"image/gif"}
						onChange={onFileChange}
					/>
				</div>

				{
					selectedFile != null &&
					<div>
						<button className="btn btn-primary btn-circle" onClick={onUploadFile}>Submit</button>
					</div>
				}
			</div>
		</div>
	);
}