import { ProfileType } from "@/DoggrTypes.ts";
import "@css/DoggrStyles.css";

export type ProfileProps = ProfileType & {
	id: number;
	gifUri: string;
	name: string;
	bio: string;
	onLikeButtonClick: () => void;
	onPassButtonClick: () => void;
};

export function Profile(props: ProfileProps) {
	const { gifUri, name, petType, bio, onLikeButtonClick, onPassButtonClick } = props;

	const minioUrl = "http://localhost:9000/doggr/" + gifUri;

	return (
		<div className={"flex flex-col items-center rounded-box bg-slate-700 w-4/5 mx-auto"}>
			<img className="rounded w-128 h-128 mt-4" src={minioUrl} alt="Profile gif" />
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			<div className={"text-2xl text-blue-300"}>Pet Type: {petType}</div>
			<div className={"text-2xl text-blue-300"}>User Bio: {bio}</div>
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-circle" onClick={onPassButtonClick}>Pass</button>
				<button className="btn btn-circle" onClick={onLikeButtonClick}>Like</button>
			</div>
		</div>
	);
}
