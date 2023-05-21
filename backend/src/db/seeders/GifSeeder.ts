import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Gifs } from "../entities/Gifs.js";
import * as fs from "fs";

export class GifsSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const gifRepo = em.getRepository(Gifs);

		// https://mikro-orm.io/docs/seeding#shared-context

		gifRepo.create({
			uploader: context.user1,
			gif: new Uint8Array(fs.readFileSync("./backend/src/gifs/loki_impressed.gif")),
		});
		gifRepo.create({
			uploader: context.user2,
			gif: new Uint8Array(fs.readFileSync("./backend/src/gifs/darth_vader_dark_side.gif")),
		});
		gifRepo.create({
			uploader: context.user3,
			gif: new Uint8Array(fs.readFileSync("./backend/src/gifs/darth_vader_impressed.gif")),
		});
		gifRepo.create({
			uploader: context.user1,
			gif: new Uint8Array(fs.readFileSync("./backend/src/gifs/darth_vader_motivation.gif")),
		});
		gifRepo.create({
			uploader: context.user2,
			gif: new Uint8Array(fs.readFileSync("./backend/src/gifs/darth_vader_view.gif")),
		});
		gifRepo.create({
			uploader: context.user3,
			gif: new Uint8Array(fs.readFileSync("./backend/src/gifs/joker_plan.gif")),
		});

	}
}
