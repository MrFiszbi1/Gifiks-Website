import { httpClient } from "@/Services/HttpClient.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export enum SubmissionStatus {
	NotSubmitted,
	SubmitFailed,
	SubmitSucceeded
}

export const CreateProfile = () => {

	const [selectedFile, setSelectedFile] = useState();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);
	const navigate = useNavigate();

	const onFileChange = ev => {
		setSelectedFile(ev.target.files[0]);
	};

	const onUploadFile = (ev) => {
		const formData = new FormData();

		formData.append("name", name);
		formData.append('email', email);
		formData.append("password", password);
		formData.append("bio", bio);
		formData.append('file', selectedFile);

		// @ts-ignore
		formData.append("fileName", selectedFile.name);

		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			}
		};


	httpClient.post("/users", formData, config)
		.then((response) => {
			console.log("Got response from uploading file", response.status);
			if (response.status === 200) {
				setSubmitted(SubmissionStatus.SubmitSucceeded);
				navigate("/login");
			} else {
				setSubmitted(SubmissionStatus.SubmitFailed);
			}
		})
		.catch(() => setSubmitted(SubmissionStatus.SubmitFailed));

	};

	return (
		<div className="bg-primary flex flex-col items-center w-4/5 mx-auto p-5 rounded-box mb-3">
			<h2 className="text-4xl mb-5">Create Account:</h2>
			{
				submitted === SubmissionStatus.SubmitFailed &&
				<h3 className="text-4xl text-red-500">CREATING PROFILE FAILED!</h3>
			}

			<div className="flex flex-col w-full mb-5">
				<label htmlFor="name" className="mb-2">Name</label>
				<input
					placeholder="Name..."
					type="text"
					id="name"
					required
					value={name}
					onChange={e => setName(e.target.value)}
					name="name"
					className="input input-bordered bg-neutral"
				/>
			</div>

			<div className="flex flex-col w-full mb-5">
				<label htmlFor="bio" className="mb-2">User Bio</label>
				<input
					placeholder="Bio..."
					type="text"
					id="bio"
					required
					value={bio}
					onChange={e => setBio(e.target.value)}
					name="petType"
					className="input input-bordered bg-neutral"
				/>
			</div>

			<div className="flex flex-col w-full mb-5">
				<label htmlFor="email" className="mb-2">Email:</label>
				<input
					placeholder="email@email.com"
					type="text"
					id="email"
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
					name="email"
					className="input input-bordered bg-neutral"
				/>
			</div>

			<div className="flex flex-col w-full mb-5">
				<label htmlFor="password" className="mb-2">Password:</label>
				<input
					placeholder="hunter2"
					type="password"
					id="password"
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
					name="password"
					className="input input-bordered bg-neutral"
				/>
			</div>

			<div className="flex flex-col w-full mb-5">
				<label htmlFor="profilepic" className="mb-2">Upload a profile gif (Must be a gif):</label>
				<input
					type={"file"}
					className={"bg-neutral doggrFileUpload input input-bordered pt-2"}
					id={"profilepic"}
					name="profilepic"
					accept={"image/gif"}
					onChange={onFileChange}
				/>
			</div>

			{
				name != null && password != null && selectedFile != null && bio != null && email != null &&
				<div>
					<button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={onUploadFile}>Create</button>
				</div>
			}
		</div>
	);

};
