export type ICreateUsersBody = {
	name: string,
	email: string,
	password: string,
	petType: string
}

export type IUpdateUsersBody = {
	name: string,
	id: number,
	petType: string
}

export type ICreateGifs = {
	uploader_id: number,
	name: string,
	gif: string,
}
