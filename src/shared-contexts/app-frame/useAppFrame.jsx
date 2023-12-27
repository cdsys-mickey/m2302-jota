import { AuthContext } from "@/contexts/auth/AuthContext";
import useAppRedirect from "@/hooks/useAppRedirect";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useMatch } from "react-router-dom";
import { ResponsiveContext } from "../responsive/ResponsiveContext";

export const useAppFrame = ({ drawerWidth } = {}) => {
	const auth = useContext(AuthContext);
	const { mobile } = useContext(ResponsiveContext);
	const { toModule, toLanding } = useAppRedirect();
	// Account

	const [drawerState, setDrawerState] = useState({
		drawerOpen: null,
		drawerWidth: drawerWidth || 300,
	});

	const [menuState, setMenuState] = useState({
		menuItems: null,
		menuLoading: null,
		menuItemSelected: null,
	});

	const [accordionState, setAccordionState] = useState({
		expanded: ["A00"],
	});

	const handleAccordionChange = useCallback(
		(panel) => (_, newExpanded) => {
			if (newExpanded) {
				setAccordionState((prev) => ({
					...prev,
					expanded: [...prev.expanded, panel],
				}));
			} else {
				setAccordionState((prev) => ({
					...prev,
					expanded: [...prev.expanded.filter((p) => p !== panel)],
				}));
			}
		},
		[]
	);

	const handleMenuItemClickBy = useCallback(
		(module) => () => {
			setMenuState((prev) => ({
				...prev,
				menuItemSelected: module,
			}));
			console.log(`module ${module.JobID} selected`);
			toModule(module.WebName);
		},
		[toModule]
	);

	const handleHomeClick = useCallback(() => {
		setMenuState((prev) => ({
			...prev,
			menuItemSelected: null,
		}));
		console.log("home clicked");
		toLanding();
	}, [toLanding]);

	// const handleSelectJob = useCallback(
	// 	(itemId) => {
	// 		const item = Auth.getItemById(menuStateEx.menus, itemId);
	// 		if (item) {
	// 			setMenuStateEx((prev) => ({
	// 				...prev,
	// 				selectedItem: itemId,
	// 			}));

	// 			if (item?.path) {
	// 				redirectTo(item.path);
	// 			}
	// 		}
	// 	},
	// 	[menuStateEx.menus, redirectTo]
	// );

	const menuFloating = useMemo(() => {
		return mobile || drawerState.drawerOpen;
	}, [drawerState.drawerOpen, mobile]);

	const isFrameMenuButtonVisibled = useMemo(() => {
		return mobile || !drawerState.drawerOpen;
	}, [drawerState.drawerOpen, mobile]);

	const handleToggleDrawerOpen = (e) => {
		e?.stopPropagation();
		setDrawerState((prev) => ({
			...prev,
			drawerOpen: !prev.drawerOpen,
		}));
	};

	const handleDrawerOpen = (open = true) => {
		setDrawerState((prev) => ({
			...prev,
			drawerOpen: open,
		}));
	};
	const handleDrawerClose = () => {
		handleDrawerOpen(false);
	};

	useEffect(() => {
		console.log(`mobile: ${mobile}`);
	}, [mobile]);

	useEffect(() => {
		if (drawerState.drawerOpen === null) {
			const defaultOpen = !mobile;
			console.log(
				`drawer default to ${defaultOpen ? "opened" : "closed"}`
			);
			setDrawerState((prev) => ({
				...prev,
				drawerOpen: defaultOpen,
			}));
		}
	}, [drawerState.drawerOpen, mobile]);

	const match = useMatch("/modules/:moduleId");
	const menuItemId = useMemo(() => {
		return match?.params?.moduleId;
	}, [match?.params?.moduleId]);

	const resetMenuState = useCallback(() => {
		console.log("resetMenuState");
		setMenuState((prev) => ({
			...prev,
			menuItemSelected: null,
		}));
	}, []);

	const recoverMenuItemSelected = useCallback(
		(menuItemId) => {
			const matchedAuthority = auth.authorities?.find(
				(a) => a.JobID === menuItemId
			);
			console.log(`recovered ${menuItemId}...`, matchedAuthority);
			setMenuState((prev) => ({
				...prev,
				menuItemSelected: matchedAuthority,
			}));
		},
		[auth.authorities]
	);

	useEffect(() => {
		if (
			auth.authorities &&
			menuItemId &&
			menuState.menuItemSelected == null
		) {
			recoverMenuItemSelected(menuItemId);
		}
	}, [
		auth.authorities,
		menuItemId,
		menuState.menuItemSelected,
		recoverMenuItemSelected,
	]);

	useEffect(() => {
		if (!auth.deptSwitchWorking) {
			resetMenuState();
		}
	}, [auth.deptSwitchWorking, resetMenuState]);

	return {
		// DRAWER
		...drawerState,
		handleToggleDrawerOpen,
		handleDrawerOpen,
		handleDrawerClose,
		menuFloating,
		isFrameMenuButtonVisibled,
		mobile,
		// MENU
		// ...menuStateEx,
		...menuState,
		handleMenuItemClickBy,
		//
		...accordionState,
		handleAccordionChange,
		// Account
		// accountAnchorEl,
		// handleAccountClick,
		// handleAccountMenuClose,
		// handleSelectJob,
		handleHomeClick,
		resetMenuState,
	};
};
