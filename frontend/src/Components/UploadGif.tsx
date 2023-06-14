import "@css/DoggrStyles.css";
import { useAuth } from "@/Services/Auth.tsx";
import { useState } from "react";
import { httpClient } from "@/Services/HttpClient.tsx";

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
		formData.append('userName', auth.userName);
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
			<h1 className="text-4xl font-bold mb-8 text-center">Upload a Gif to Your Gallery</h1>
			<div className="bg-primary flex flex-col items-center w-4/5 mx-auto p-5 rounded-box">
				{
					submitted === SubmissionStatus.SubmitFailed &&
					<h3 className="text-4xl  text-red-500">UPLOAD GIF FAILED!</h3>
				}
				{
					submitted === SubmissionStatus.SubmitSucceeded &&
					<h3 className="text-4xl  text-green-500">UPLOAD GIF Succeeded! View In Gallery</h3>
				}
				<div className="flex flex-col w-full mb-5">
					<label htmlFor="newGif" className="mb-2">Upload a Gif:</label>
					<input
						type={"file"}
						className={"bg-neutral doggrFileUpload input input-bordered pt-2"}
						id={"newGif"}
						name="newGif"
						accept={"image/gif"}
						onChange={onFileChange}
					/>
				</div>

				{
					selectedFile != null &&
					<div>
						<button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={onUploadFile}>Submit</button>
					</div>
				}
			</div>
		</div>
	);
}
