import { useContext } from "react";
import { ResponsiveContext } from "./ResponsiveContext";

const useResponsive = () => {
	return useContext(ResponsiveContext);
};

export default useResponsive;
