import { useAuth } from "@/Services/Auth.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
	const auth = useAuth();
	const navigate = useNavigate();

	useEffect( () => {
		const processLogout = async () => {
			if(auth) {
				const logoutSuccess = await auth.handleLogout();
				navigate("/");
				return logoutSuccess;
			} else {
				console.error("Authorization is missing somehow");
				navigate("/");
				return false;
			}
		};

		processLogout().then( (res) => {
			if(res){
				console.log("Logout completed successfully");
			}
			else{
				console.log("Logout was not successfully");
			}
		});
	});

	return (<></>);
}
