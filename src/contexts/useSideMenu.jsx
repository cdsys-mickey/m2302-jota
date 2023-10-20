import { useContext } from "react";
import { SideMenuContext } from "./SideMenuContext";

const useSideMenu = () => {
	return useContext(SideMenuContext);
};

export default useSideMenu;
