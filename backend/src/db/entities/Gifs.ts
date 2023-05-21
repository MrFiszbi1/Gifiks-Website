import { Entity, Property, ManyToOne, Cascade } from "@mikro-orm/core";
// Control + click these imports to view their actual code/type
// Also see identity functions here - https://betterprogramming.pub/typescript-generics-90be93d8c292
import type {Ref, Rel} from "@mikro-orm/core";
import { DoggrBaseEntity } from "./DoggrBaseEntity.js";
import { User } from "./User.js";

@Entity()
export class Gifs extends DoggrBaseEntity {

	// The person who posted the Gif
	@ManyToOne()
	uploader!: Ref<User>;

	@Property()
	gif!: Uint8Array;
}
