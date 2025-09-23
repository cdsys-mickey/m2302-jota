import { useCallback, useState } from "react";

export const useSideDrawer = () => {
	const [sideDrawerOpen, setSideDrawerOpen] = useState();

	const handleSideDrawerOpen = useCallback(() => {
		setSideDrawerOpen(true);
	}, []);

	const handleSideDrawerClose = useCallback(() => {
		setSideDrawerOpen(false);
	}, []);

	return {
		sideDrawerOpen,
		handleSideDrawerOpen,
		handleSideDrawerClose
	}

}
