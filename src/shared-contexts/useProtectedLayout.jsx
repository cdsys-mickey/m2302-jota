import { useContext } from "react";
import { ProtectedLayoutContext } from "./ProtectedLayoutContext";

const useProtectedLayout = () => {
	return useContext(ProtectedLayoutContext);
};

export default useProtectedLayout;
