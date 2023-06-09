import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Gifs } from "../entities/Gifs.js";
import * as fs from "fs";
import Path from 'path'

export class GifsSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const gifRepo = em.getRepository(Gifs);

		const name1 = Path.parse('../backend/src/assets/gifs/darth_vader_dark_side.gif').name;
		const name2 = Path.parse('../backend/src/assets/gifs/darth_vader_impressed.gif').name;
		const name3 = Path.parse('../backend/src/assets/gifs/darth_vader_motivation.gif').name;
		const name4 = Path.parse('../backend/src/assets/gifs/darth_vader_view.gif').name;
		const name5 = Path.parse('../backend/src/assets/gifs/dragonball_vegeta_over9000.gif').name;
		const name6 = Path.parse('../backend/src/assets/gifs/dragonball_vegeta_rankedup.gif').name;
		const name7 = Path.parse('../backend/src/assets/gifs/dragonball_vegeta_smart.gif').name;
		const name8 = Path.parse('../backend/src/assets/gifs/joker_go.gif').name;
		const name9 = Path.parse('../backend/src/assets/gifs/joker_like.gif').name;
		const name10 = Path.parse('../backend/src/assets/gifs/joker_plan.gif').name;
		const name11 = Path.parse('../backend/src/assets/gifs/loki_enough.gif').name;
		const name12 = Path.parse('../backend/src/assets/gifs/loki_fear.gif').name;
		const name13 = Path.parse('../backend/src/assets/gifs/loki_impressed.gif').name;
		const name14 = Path.parse('../backend/src/assets/gifs/Naruto_Sasuke_happy.gif').name;
		const name15 = Path.parse('../backend/src/assets/gifs/Naruto_Sasuke_Sad.gif').name;
		const name16 = Path.parse('../backend/src/assets/gifs/Naruto_Sasuke_Serious.gif').name;
		const name17 = Path.parse('../backend/src/assets/gifs/SouthPark_authoritah.gif').name;
		const name18 = Path.parse('../backend/src/assets/gifs/SouthPark_gamer.gif').name;
		const name19 = Path.parse('../backend/src/assets/gifs/SouthPark_notfat.gif').name;


		// https://mikro-orm.io/docs/seeding#shared-context

		gifRepo.create({
			uploader: context.user1,
			uploaderName: context.user1.name,
			gifUri:`${name1}.gif`,
			name: name1,
		});

		gifRepo.create({
			uploader: context.user1,
			uploaderName: context.user1.name,
			gifUri: `${name2}.gif`,
			name: name2,
		});

		gifRepo.create({
			uploader: context.user1,
			uploaderName: context.user1.name,
			gifUri: `${name3}.gif`,
			name: name3,
		});

		gifRepo.create({
			uploader: context.user1,
			uploaderName: context.user1.name,
			gifUri: `${name4}.gif`,
			name: name4,
		});

		gifRepo.create({
			uploader: context.user2,
			uploaderName: context.user2.name,
			gifUri: `${name5}.gif`,
			name: name5,
		});

		gifRepo.create({
			uploader: context.user2,
			uploaderName: context.user2.name,
			gifUri: `${name6}.gif`,
			name: name6,
		});

		gifRepo.create({
			uploader: context.user2,
			uploaderName: context.user2.name,
			gifUri: `${name7}.gif`,
			name: name7,
		});

		gifRepo.create({
			uploader: context.user3,
			uploaderName: context.user3.name,
			gifUri: `${name8}.gif`,
			name: name8,
		});

		gifRepo.create({
			uploader: context.user3,
			uploaderName: context.user3.name,
			gifUri: `${name9}.gif`,
			name: name9,
		});

		gifRepo.create({
			uploader: context.user3,
			uploaderName: context.user3.name,
			gifUri: `${name10}.gif`,
			name: name10,
		});

		gifRepo.create({
			uploader: context.user4,
			uploaderName: context.user4.name,
			gifUri: `${name11}.gif`,
			name: name11,
		});

		gifRepo.create({
			uploader: context.user4,
			uploaderName: context.user4.name,
			gifUri: `${name12}.gif`,
			name: name12,
		});

		gifRepo.create({
			uploader: context.user4,
			uploaderName: context.user4.name,
			gifUri: `${name13}.gif`,
			name: name13,
		});

		gifRepo.create({
			uploader: context.user5,
			uploaderName: context.user5.name,
			gifUri: `${name14}.gif`,
			name: name14,
		});

		gifRepo.create({
			uploader: context.user5,
			uploaderName: context.user5.name,
			gifUri: `${name15}.gif`,
			name: name15,
		});

		gifRepo.create({
			uploader: context.user5,
			uploaderName: context.user5.name,
			gifUri: `${name16}.gif`,
			name: name16,
		});

		gifRepo.create({
			uploader: context.user6,
			uploaderName: context.user6.name,
			gifUri: `${name17}.gif`,
			name: name17,
		});

		gifRepo.create({
			uploader: context.user6,
			uploaderName: context.user6.name,
			gifUri: `${name18}.gif`,
			name: name18,
		});

		gifRepo.create({
			uploader: context.user6,
			uploaderName: context.user6.name,
			gifUri: `${name19}.gif`,
			name: name19,
		});
	}
}
