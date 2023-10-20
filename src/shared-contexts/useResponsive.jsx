import { useContext } from "react";
import { ResponsiveContext } from "./ResponsiveContext";

export const useResponsive = () => {
	return useContext(ResponsiveContext);
};
