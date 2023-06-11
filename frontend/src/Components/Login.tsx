import { useAuth } from "@/Services/Auth.tsx";
import { useCallback, useState } from "react";

export function Login() {
	const context = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitFailed, setSubmitFailed] = useState(false);

	const onSubmitLogin = useCallback(async () => {
		if (context) {
			const loginSuccess = await context.handleLogin(email, password);
			if (!loginSuccess) {
				setSubmitFailed(true);
			}
		} else {
			console.error("We have no auth context WARNING WARNING");
		}
	}, [email, password, context, setSubmitFailed]);

	return (
		<div className={"bg-primary flex flex-col items-center rounded-box w-2/5 mx-auto"}>
			<div className="text-4xl mb-5">Login</div>
			<div>
				{submitFailed ? <p>Your password or email was incorrect! Please try again.</p> : null}
			</div>

			<div className="flex flex-col w-11/12 mb-5">
				<label htmlFor={"email"} className="mb-2">Email Address:</label>
				<input
					type="text"
					id="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					name={"email"}
					className="input input-bordered bg-neutral"
				/>
			</div>

			<div className="flex flex-col w-11/12 mb-5">
				<label htmlFor={"password"} className="mb-2">Password:</label>
				<input
					type="password"
					id="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name={"password"}
					className="input input-bordered bg-neutral"
				/>
			</div>

			<div>
				<button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg mb-3"  onClick={onSubmitLogin}>Login</button>
			</div>
		</div>
	);
}
