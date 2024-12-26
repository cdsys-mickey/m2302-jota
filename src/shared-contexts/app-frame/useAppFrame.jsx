import { AuthContext } from "@/contexts/auth/AuthContext";
import useAppRedirect from "@/hooks/useAppRedirect";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useMatch } from "react-router-dom";
import { ResponsiveContext } from "../responsive/ResponsiveContext";
import { useLocation } from "react-router-dom";

export const useAppFrame = (opts = {}) => {
	const { drawerWidth = 300 } = opts;
	const auth = useContext(AuthContext);
	const { mobile } = useContext(ResponsiveContext);
	const { toModule, toLanding } = useAppRedirect();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const drawer = queryParams.get("drawer") != 0;

	// Account

	const [drawerState, setDrawerState] = useState({
		drawerOpen: null,
		drawerWidth,
	});

	const [menuState, setMenuState] = useState({
		menuItems: null,
		menuLoading: null,
		menuItemSelected: null,
	});

	// const [accordionState, setAccordionState] = useState({
	// 	expanded: ["A00"],
	// });

	// const handleAccordionChange = useCallback(
	// 	(panel) => (_, newExpanded) => {
	// 		if (newExpanded) {
	// 			setAccordionState((prev) => ({
	// 				...prev,
	// 				expanded: [...prev.expanded, panel],
	// 			}));
	// 		} else {
	// 			setAccordionState((prev) => ({
	// 				...prev,
	// 				expanded: [...prev.expanded.filter((p) => p !== panel)],
	// 			}));
	// 		}
	// 	},
	// 	[]
	// );

	const clearParams = useCallback(() => {
		if (menuState.menuItemSelected?.WebName) {
			toModule(menuState.menuItemSelected?.WebName);
		}
	}, [menuState.menuItemSelected?.WebName, toModule]);

	const handleMenuItemClick = useCallback(
		(e, module) => {
			// setMenuState((prev) => ({
			// 	...prev,
			// 	menuItemSelected: module,
			// }));
			// console.log(`module ${module.JobID} selected`);
			// toModule(module.WebName);

			if (e.ctrlKey || e.shiftKey) {
				console.log("module", module);
				e.preventDefault();
				e.stopPropagation();
				console.log("window.location", window.location);
				const url = `${import.meta.env.VITE_PUBLIC_URL}modules/${module.WebName}?drawer=0`;
				const newTab = window.open(url, "_blank");
				if (newTab) {
					newTab.focus(); // 確保切換到新頁籤
				} else {
					alert('無法開啟新頁籤，可能被瀏覽器阻擋');
				}
			} else {
				setMenuState((prev) => ({
					...prev,
					menuItemSelected: module,
				}));
				console.log(`module ${module.JobID} selected`);
				toModule(module.WebName);
			}
		},
		[toModule]
	);

	const handleSelect = useCallback(
		(module, params) => {
			setMenuState((prev) => ({
				...prev,
				menuItemSelected: module,
			}));
			console.log(`module ${module?.JobID || null} selected`);
			if (module?.WebName) {
				toModule(module?.WebName, params);
			}
		},
		[toModule]
	);

	const selectJobById = useCallback(
		(moduleId, params) => {
			const module = auth.authorities.find((x) => x.JobID === moduleId);
			if (module) {
				handleSelect(module, params);
			}
		},
		[auth.authorities, handleSelect]
	);

	const handleHomeClick = useCallback(() => {
		setMenuState((prev) => ({
			...prev,
			menuItemSelected: null,
		}));
		console.log("home clicked");
		toLanding();
	}, [toLanding]);

	const detectDrawerState = useCallback(() => {
		const defaultOpen = !mobile && drawer;
		console.log(`drawer default to ${defaultOpen ? "opened" : "closed"}`);
		setDrawerState((prev) => ({
			...prev,
			drawerOpen: defaultOpen,
		}));
	}, [drawer, mobile]);

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
			detectDrawerState();
		}
	}, [detectDrawerState, drawerState.drawerOpen, mobile]);

	const moduleMatched = useMatch("/modules/:moduleId");
	const menuItemId = useMemo(() => {
		return moduleMatched?.params?.moduleId;
	}, [moduleMatched?.params?.moduleId]);

	const resetMenuState = useCallback(() => {
		console.log("resetMenuState");
		setMenuState((prev) => ({
			...prev,
			menuItemSelected: null,
		}));
	}, []);

	const recoverMenuItemSelected = useCallback(
		(menuItemId) => {
			console.log(`recoverMenuItemSelected(${menuItemId})`);
			if (menuItemId) {
				const matchedAuthority = auth.authorities?.find(
					(a) => a.JobID === menuItemId
				);
				console.log(`recovered ${menuItemId}...`, matchedAuthority);
				setMenuState((prev) => ({
					...prev,
					menuItemSelected: matchedAuthority,
				}));
				document.title = [menuItemId, matchedAuthority?.JobName].filter(Boolean).join(" - ");
			} else {
				setMenuState((prev) => ({
					...prev,
					menuItemSelected: null,
				}));
			}
		},
		[auth.authorities]
	);

	useEffect(() => {
		if (auth.authorities) {
			recoverMenuItemSelected(menuItemId);
		}
	}, [auth.authorities, menuItemId, recoverMenuItemSelected]);

	// useEffect(() => {
	// 	if (!auth.deptSwitchWorking) {
	// 		resetMenuState();
	// 	}
	// }, [auth.deptSwitchWorking, resetMenuState]);

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
		handleMenuItemClick,
		//
		// ...accordionState,
		// handleAccordionChange,
		// Account
		// accountAnchorEl,
		// handleAccountClick,
		// handleAccountMenuClose,
		// handleSelectJob,
		handleHomeClick,
		resetMenuState,
		handleSelect,
		selectJobById,
		detectDrawerState,
		clearParams,
	};
};
