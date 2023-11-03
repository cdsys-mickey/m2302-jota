import { useContext } from "react";
import { SignInContext } from "./SignInContext";

const useSignIn = () => {
	return useContext(SignInContext);
};

export default useSignIn;
