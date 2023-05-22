import type { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from '@mikro-orm/seeder';
import { Gifs } from "../entities/Gifs.js";
import * as fs from "fs";
import Path from 'path'

export class GifsSeeder extends Seeder {
	async run(em: EntityManager, context: Dictionary): Promise<void> {

		const gifRepo = em.getRepository(Gifs);

		const GifData1 = fs.readFileSync("../backend/src/gifs/loki_impressed.gif");
		const GifData2 = fs.readFileSync("../backend/src/gifs/darth_vader_dark_side.gif");
		const GifData3 = fs.readFileSync("../backend/src/gifs/darth_vader_impressed.gif");
		const GifData4 = fs.readFileSync("../backend/src/gifs/darth_vader_motivation.gif");
		const GifData5 = fs.readFileSync("../backend/src/gifs/darth_vader_view.gif");
		const GifData6 = fs.readFileSync("../backend/src/gifs/joker_plan.gif");

		const name1 = Path.parse('../backend/src/gifs/loki_impressed.gif').name;
		const name2 = Path.parse('../backend/src/gifs/darth_vader_dark_side.gif').name;
		const name3 = Path.parse('../backend/src/gifs/darth_vader_impressed.gif').name;
		const name4 = Path.parse('../backend/src/gifs/darth_vader_motivation.gif').name;
		const name5 = Path.parse('../backend/src/gifs/darth_vader_view.gif').name;
		const name6 = Path.parse('../backend/src/gifs/joker_plan.gif').name;

		// https://mikro-orm.io/docs/seeding#shared-context

		gifRepo.create({
			uploader: context.user1,
			gif: Buffer.from(GifData1),
			name: name1,

		});
		gifRepo.create({
			uploader: context.user2,
			gif: Buffer.from(GifData2),
			name: name2,
		});
		gifRepo.create({
			uploader: context.user3,
			gif: Buffer.from(GifData3),
			name: name3,
		});
		gifRepo.create({
			uploader: context.user1,
			gif: Buffer.from(GifData4),
			name: name4,
		});
		gifRepo.create({
			uploader: context.user2,
			gif: Buffer.from(GifData5),
			name: name5,
		});
		gifRepo.create({
			uploader: context.user3,
			gif: Buffer.from(GifData6),
			name: name6,
		});

	}
}
