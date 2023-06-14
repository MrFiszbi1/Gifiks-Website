import { Entity, Property, Unique, OneToMany, Collection, Cascade } from "@mikro-orm/core";
import { SoftDeletable } from "mikro-orm-soft-delete";
import { DoggrBaseEntity } from "./DoggrBaseEntity.js";

import { Enum } from "@mikro-orm/core";
import { Gifs } from "./Gifs.js";

export enum UserRole {
	ADMIN = 'Admin',
	USER = 'User'
}

// https://github.com/TheNightmareX/mikro-orm-soft-delete
// Yes, it's really that easy.
@SoftDeletable(() => User, "deleted_at", () => new Date())
@Entity({ tableName: "users"})
export class User extends DoggrBaseEntity {
	@Property()
	@Unique()
	email!: string;
	
	@Property()
	name!: string

	@Property()
	bio!: string;

	@Enum(() => UserRole)
	role!: UserRole; // string en// um

	@Property({fieldName: 'gif_uri'})
	gifUri!: string;

	@OneToMany(
		() => Gifs,
		gif => gif.uploader,
		{cascade: [Cascade.PERSIST, Cascade.REMOVE], orphanRemoval: true}
	)
	gallary!: Collection<Gifs>;
}
