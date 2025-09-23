import { useContext } from "react";
import ZZCrudContext from "./ZZCrudContext";

export const useCrudZZ = () => {
	return useContext(ZZCrudContext);
};
