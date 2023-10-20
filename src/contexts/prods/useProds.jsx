import { useContext } from "react";
import { ProdsContext } from "./ProdsContext";

export const useProds = () => {
	return useContext(ProdsContext);
};
