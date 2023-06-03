import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SOFT_DELETABLE_FILTER } from "mikro-orm-soft-delete";
import { User, UserRole } from "../db/entities/User.js";
import { ICreateUsersBody, IUpdateUsersBody } from "../types.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import jwt from "jsonwebtoken";

export function UserRoutesInit(app: FastifyInstance) {
	// Route that returns all users, soft deleted and not
	app.get("/dbTest", async (request: FastifyRequest, _reply: FastifyReply) => {
		return request.em.find(User, {}, { filters: { [SOFT_DELETABLE_FILTER]: false } });
	});

	// Route that returns all users who ARE NOT SOFT DELETED
	app.get("/users", async (req, reply) => {
		try {
			const theUser = await req.em.find(User, {});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// User CRUD
	// Refactor note - We DO use email still for creation!  We can't know the ID yet
	app.post<{ Body: ICreateUsersBody }>("/users", async (req, reply) => {
		const { name, email, password, petType } = req.body;
		const auth = getAuth(app.firebase);
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const newUser = await req.em.create(User, {
				name,
				email,
				petType,
				// We'll only create Admins manually!
				role: UserRole.USER
			});

			await req.em.flush();
			return reply.send(newUser);
		} catch (err) {
			return reply.status(500).send({ message: err.message });
		}
	});

	//READ
	app.search("/users", async (req, reply) => {
		const { id } = req.body;

		try {
			const theUser = await req.em.findOneOrFail(User, id, {strict: true});
			reply.send(theUser);
		} catch (err) {
			reply.status(500).send(err);
		}
	});

	// UPDATE
	app.put<{ Body: IUpdateUsersBody }>("/users", async (req, reply) => {
		const { name, id, petType } = req.body;

		const userToChange = await req.em.findOneOrFail(User, id, {strict: true});
		userToChange.name = name;
		userToChange.petType = petType;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		reply.send(userToChange);
	});

	// DELETE
	app.delete<{ Body: { my_id: number; id_to_delete: number, password: string } }>("/users", async (req, reply) => {
		const { my_id, id_to_delete } = req.body;

		try {
			// Authenticate my user's role
			const me = await req.em.findOneOrFail(User, my_id, {strict: true});

			// Make sure the requester is an Admin
			if (me.role === UserRole.USER) {
				return reply.status(401).send({ "message": "You are not an admin!"})
			}

			const theUserToDelete = await req.em.findOneOrFail(User, id_to_delete, {strict: true});

			//Make sure the to-be-deleted user isn't an admin
			if (theUserToDelete.role === UserRole.ADMIN) {
				return reply.status(401).send({ "message": "You do not have enough privileges to delete an Admin!"})
			}

			await req.em.remove(theUserToDelete).flush();
			return reply.send(theUserToDelete);
		} catch (err) {
			return reply.status(500).send(err);
		}
	});

	app.post<{
		Body: {
			email: string,
			password: string,
		}
	}>("/login", async (req, reply) => {
		const { email, password } = req.body;

		try {
			const theUser = await req.em.findOneOrFail(User, {email}, { strict: true });
			const auth = getAuth(app.firebase);
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			if (userCredential) {
				const { user } = userCredential;
				if (user) {
					const userId = theUser.id;
					const token = jwt.sign({ userId }, "your-secret-key");

					reply.send({ token });
				} else {
					app.log.info(`Sign-in failed for user ${email}`);
					reply.status(401).send("Invalid email or password");
				}
			} else {
				app.log.info(`Sign-in failed for user ${email}: ${userCredential}`);
				reply.status(401).send("Invalid email or password");
			}
		} catch (err) {
			console.log(err);
			reply.status(500).send(err);
		}
	});


	app.post("/logout", async (req, reply) => {
		try {
			const auth = getAuth(app.firebase);
			await signOut(auth);
			reply.send("Logged out successfully");
		} catch (err) {
			console.log(err);
			reply.status(500).send(err);
		}
	});

	app.get("/profile", async(req, reply) => {

		const userRepo = req.em.getRepository(User);
		const totalCount = await userRepo.count();
		const randomOffset = Math.floor(Math.random() * totalCount);
		const randomEntity = await userRepo.findOne({}, {offset: randomOffset});
		reply.send(randomEntity);
	});
	/*
		app.post("/create-user-accounts", async (req, reply) => {
		try {
			const auth = getAuth(app.firebase);
			const users = await req.em.find(User, {});

			for (const user of users) {
				const { email, password } = user;

				try {
					// Check if the user is already registered
					await signInWithEmailAndPassword(auth, email, password);

					console.log(`User ${email} is already registered. Skipping...`);
				} catch (error) {
					if (error.code === "auth/user-not-found") {
						// User is not registered, create the account
						await createUserWithEmailAndPassword(auth, email, password);
						console.log(`User ${email} account created successfully.`);
					} else {
						// Other authentication error occurred
						console.error(`Error creating account for user ${email}:`, error);
					}
				}
			}

			reply.send("User accounts creation completed.");
		} catch (error) {
			console.error("Error creating user accounts:", error);
			reply.status(500).send("Failed to create user accounts");
		}
	});
	 */
}
