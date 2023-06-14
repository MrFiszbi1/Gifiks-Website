import { ProfileType } from "@/DoggrTypes.ts";
import "@css/DoggrStyles.css";

export type ProfileProps = ProfileType & {
	id: number;
	gifUri: string;
	name: string;
	bio: string;
};

export function Profile(props) {
	const { gifUri, name, bio} = props;

	const minioUrl = "http://localhost:9000/doggr/" + gifUri;

	return (
		<div className={"bg-primary flex flex-col items-center rounded-box w-2/5 mx-auto"}>
			<h2 className={"text-4xl m-0 my-2"}>User: {name}</h2>
			<img
				className="rounded mx-4"
				src={minioUrl}
				alt="Profile gif"
				style={{ width: "700px", height: "350px" }}
			/>
			<div className={"text-2xl m-3"}>Bio: {bio}</div>
		</div>
	);
}
