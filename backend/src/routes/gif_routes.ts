import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateGifs } from "../types.js";
import { Gifs } from "../db/entities/Gifs.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import jwt from "jsonwebtoken";
import { UploadFileToMinio } from "../plugins/minio.js";

export function GifRoutesInit(app: FastifyInstance) {

	/* This is the routes that control the gifs that are uploaded to the site
	 */
	//upload a gif
	app.post<{ Body: {uploader: string, userName: string }}>("/uploadgif", async (req, reply) => {
	try {
			const data = await req.file();

			const body = Object.fromEntries(
				// @ts-ignore
				Object.keys(data.fields).map( (key) => [key, data.fields[key].value])
			);
			const { uploader, userName } = body;
			await UploadFileToMinio(data);

			const uploaderNum = parseInt(uploader);

			// This is a pure convenience so we don't have to keep passing User to req.em.find
			const userRepository = req.em.getRepository(User);

			//Find the user IDs, so we can link them into our new gif
			const uploaderEntity = await userRepository.getReference(uploaderNum);

			//const uploaderName = uploaderEntity.name;

			const parts = data.filename.split('.');
			const firstPart = parts[0];

			// Create the new gif
			const newGif = await req.em.create(Gifs, {
				uploader: uploaderEntity,
				uploaderName: userName,
				name: firstPart,
				gifUri: data.filename,
			});
			// Send our changes to the database
			await req.em.flush();

			// Let the user know everything went fine
			return reply.send(newGif);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//view all gifs as a feed
	app.get("/feed", async (req, reply) => {
		try {
			const allUsers = await req.em.find(User, {});
			const gifs = [];
			for await (const user of allUsers) {
				const usergifs = await req.em.find(Gifs, { uploader: user});
				gifs.push(...usergifs);
			}
			const gifCount = gifs.length;
			const randomGifs = [];
			const gifsAdded = [];
			let i = 0;
			while (randomGifs.length < 10 && i < gifCount) {
				const randomOffset = Math.floor(Math.random() * gifCount);
				const selectedGif = gifs[randomOffset];
				if (!gifsAdded.includes(selectedGif)) {
					randomGifs.push(selectedGif);
					gifsAdded.push(selectedGif);
				}
				i++;
			}
			return reply.send(randomGifs);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//view uploader gallary
	app.search<{ Body: { user: number } }>("/gallery", async (req, reply) => {
		const { user } = req.body;

		try {
			const uploaderEntity = await req.em.getReference(User, user);
			const gifs = await req.em.find(Gifs, { uploader: uploaderEntity });
			return reply.send(gifs);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});


	//View a users gallary
	app.search<{ Body: { user_id: number } }>("/gallary/search", async (req, reply) => {
		const { user_id } = req.body;

		try {
			const userEntity = await req.em.getReference(User, user_id);
			const gifs = await req.em.find(Gifs, { uploader: userEntity });
			return reply.send(gifs);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});


	// Delete a specific gif
	app.delete<{ Body: { gif_id: number } }>("/gallary", async (req, reply) => {
		const { gif_id} = req.body;

		try {
			const gifToDelete = await req.em.findOneOrFail(Gifs, gif_id, {strict: true});
			await req.em.removeAndFlush(gifToDelete);
			return reply.send();
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	// Delete all sent gifs
	app.delete<{ Body: { my_id: number } }>(
		"/gallary/all",
		async (req, reply) => {
			const { my_id} = req.body;

			try {
				const me = await req.em.findOneOrFail(User, my_id, { strict: true });

				// populate our gallary relation
				await me.gallary.init();
				// Remove them all from the collection, which because of orphanRemoval: true, will also delete them fully
				me.gallary.removeAll();

				await req.em.flush();

				return reply.status(200).send();
			} catch (err) {
				return reply.status(500).send({ message: err.message });
			}
		}
	);
}
