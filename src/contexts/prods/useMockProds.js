import { useContext } from "react";
import { MockProdsContext } from "./MockProdsContext";

export const useMockProds = () => {
	return useContext(MockProdsContext);
};
