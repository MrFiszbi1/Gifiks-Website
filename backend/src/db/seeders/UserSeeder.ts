import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities/User.js";

export class UserSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {
		// https://mikro-orm.io/docs/seeding#shared-context

		context.user1 = em.create(User, {
			name: "Darth Vader",
			email: "email@email.com",
			petType: "Dog",
			imgUri: "Darth_Vader.gif",
			role: UserRole.ADMIN,
		});

		context.user2 = em.create(User, {
			name: "Vegeta",
			email: "email2@email.com",
			petType: "Dog",
			imgUri: "Vegeta.gif",
			role: UserRole.USER,
		});

		context.user3 = em.create(User, {
			name: "Joker",
			email: "email3@email.com",
			petType: "Dog",
			imgUri: "Joker.gif",
			role: UserRole.USER,
		});

		context.user4 = em.create(User, {
			name: "Loki",
			email: "email4@email.com",
			petType: "Cat",
			imgUri: "Loki.gif",
			role: UserRole.USER,
		});

		context.user5 = em.create(User, {
			name: "Sasuke",
			email: "email5@email.com",
			petType: "Cat",
			imgUri: "Sasuke.gif",
			role: UserRole.USER,
		});

		context.user6 = em.create(User, {
			name: "Eric Cartman",
			email: "email6@email.com",
			petType: "Cat",
			imgUri: "Eric_Cartman.gif",
			role: UserRole.USER,
		});
	}
}
