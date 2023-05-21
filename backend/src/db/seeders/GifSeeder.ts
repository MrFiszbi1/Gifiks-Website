import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Gifs } from "../entities/Gifs.js";
import * as fs from "fs";

export class GifsSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const gifRepo = em.getRepository(Gifs);

		const GifData1 = fs.readFileSync("../backend/src/gifs/loki_impressed.gif");
		const GifData2 = fs.readFileSync("../backend/src/gifs/darth_vader_dark_side.gif");
		const GifData3 = fs.readFileSync("../backend/src/gifs/darth_vader_impressed.gif");
		const GifData4 = fs.readFileSync("../backend/src/gifs/darth_vader_motivation.gif");
		const GifData5 = fs.readFileSync("../backend/src/gifs/darth_vader_view.gif");
		const GifData6 = fs.readFileSync("../backend/src/gifs/joker_plan.gif");

		// https://mikro-orm.io/docs/seeding#shared-context

		gifRepo.create({
			uploader: context.user1,
			gif: Buffer.from(GifData1),
			count: 1,
		});
		gifRepo.create({
			uploader: context.user2,
			gif: Buffer.from(GifData2),
			count: 2,
		});
		gifRepo.create({
			uploader: context.user3,
			gif: Buffer.from(GifData3),
			count: 3,
		});
		gifRepo.create({
			uploader: context.user1,
			gif: Buffer.from(GifData4),
			count: 4,
		});
		gifRepo.create({
			uploader: context.user2,
			gif: Buffer.from(GifData5),
			count: 5,
		});
		gifRepo.create({
			uploader: context.user3,
			gif: Buffer.from(GifData6),
			count: 6,
		});

	}
}
