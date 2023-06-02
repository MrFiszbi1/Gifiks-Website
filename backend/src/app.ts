import Fastify from "fastify";
import cors from '@fastify/cors';
import { FastifyBadWordsPlugin } from "./plugins/badwords.js";
import { FastifySearchHttpMethodPlugin } from "./plugins/http_search.js";
import { FastifyMikroOrmPlugin } from "./plugins/mikro.js";
import DoggrRoutes from "./routes/routes.js";
import config from "./db/mikro-orm.config.js";
import { firebasePlugin } from "./plugins/firebase.js";

const firebaseConfig = {
	apiKey: "AIzaSyCIhMF92V5cT5T7DD9x4kHVoDeqtAdg54o",
	authDomain: "gifiks-website.firebaseapp.com",
	projectId: "gifiks-website",
	storageBucket: "gifiks-website.appspot.com",
	messagingSenderId: "851799627353",
	appId: "1:851799627353:web:bdf1034b04ac1ae93c0348"
};

const envToLogger = {
	development: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "debug",
	},
	production: {
		level: "error"
	},
	test: {
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
		level: "warn"
	},
};

const app = Fastify({
	logger: envToLogger[process.env.NODE_ENV]
});

await app.register(cors, {
	origin: (origin, cb) => {
		cb(null, true);
	}
});

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin, {});
await app.register(FastifyBadWordsPlugin);
await app.register(firebasePlugin, firebaseConfig);
await app.register(DoggrRoutes, {});

export default app;
