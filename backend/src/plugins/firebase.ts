import {FastifyInstance } from "fastify";
import { initializeApp } from "firebase/app";

declare module 'fastify' {
	interface FastifyInstance {
		firebase: any;
	}
}

export const firebasePlugin = async function (app: FastifyInstance, options) {
	const firebase = initializeApp(options);
	app.decorate("firebase", firebase);
};
