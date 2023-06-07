import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Gifs } from "../entities/Gifs.js";
import * as fs from "fs";
import Path from 'path'

export class GifsSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const gifRepo = em.getRepository(Gifs);

		const name1 = Path.parse('../backend/src/assets/gifs/dragonball_vegeta_smart.gif').name;
		const name2 = Path.parse('../backend/src/assets/gifs/darth_vader_dark_side.gif').name;
		const name3 = Path.parse('../backend/src/assets/gifs/darth_vader_impressed.gif').name;
		const name4 = Path.parse('../backend/src/assets/gifs/darth_vader_motivation.gif').name;
		const name5 = Path.parse('../backend/src/assets/gifs/darth_vader_view.gif').name;
		const name6 = Path.parse('../backend/src/assets/gifs/joker_plan.gif').name;

		// https://mikro-orm.io/docs/seeding#shared-context

		gifRepo.create({
			uploader: context.user1,
			gifUri:`${name1}.gif`,
			name: name1,
		});

		gifRepo.create({
			uploader: context.user2,
			gifUri: `${name2}.gif`,
			name: name2,
		});

		gifRepo.create({
			uploader: context.user3,
			gifUri: `${name3}.gif`,
			name: name3,
		});

		gifRepo.create({
			uploader: context.user1,
			gifUri: `${name4}.gif`,
			name: name4,
		});

		gifRepo.create({
			uploader: context.user2,
			gifUri: `${name5}.gif`,
			name: name5,
		});

		gifRepo.create({
			uploader: context.user4,
			gifUri: `${name6}.gif`,
			name: name6,
		});

	}
}
