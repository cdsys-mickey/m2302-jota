import { useContext } from "react";
import CrudContext from "./CrudContext";

export const useCrud = () => {
	return useContext(CrudContext);
};
