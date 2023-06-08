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
			bio: "I brought balance to the force",
			gifUri: "Darth_Vader.gif",
			role: UserRole.ADMIN,
		});

		context.user2 = em.create(User, {
			name: "Vegeta",
			email: "email2@email.com",
			petType: "Dog",
			bio: "I saved the universe",
			gifUri: "Vegeta.gif",
			role: UserRole.USER,
		});

		context.user3 = em.create(User, {
			name: "Joker",
			email: "email3@email.com",
			petType: "Dog",
			bio: "I taught people the reality of the mind",
			gifUri: "Joker.gif",
			role: UserRole.USER,
		});

		context.user4 = em.create(User, {
			name: "Loki",
			email: "email4@email.com",
			petType: "Cat",
			bio: "Asgard prospered under me",
			gifUri: "Loki.gif",
			role: UserRole.USER,
		});

		context.user5 = em.create(User, {
			name: "Sasuke",
			email: "email5@email.com",
			petType: "Cat",
			bio: "I am the protector of the ninja world",
			gifUri: "Sasuke.gif",
			role: UserRole.USER,
		});

		context.user6 = em.create(User, {
			name: "Eric Cartman",
			email: "email6@email.com",
			petType: "Cat",
			bio: "I am just a boy bringing joy to his friends and family",
			gifUri: "Eric_Cartman.gif",
			role: UserRole.USER,
		});
	}
}
