export type State = {
	currentProfile: ProfileType;
	likeHistory: Array<ProfileType>;
	passHistory: Array<ProfileType>;
};

export type ProfileType = {
	gifUri: string;
	thumbUri: string;
	name: string;
	petType: string;
	bio:string;
	id: number;
};
