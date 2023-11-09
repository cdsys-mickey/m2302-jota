import useAppRedirect from "@/hooks/useAppRedirect";
import useResponsive from "@/shared-contexts/responsive/useResponsive";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AppFrameContext } from "./AppFrameContext";

const AppFrameProvider = (props) => {
	const { children, drawerWidth } = props;
	const { mobile } = useResponsive();
	const { redirectToModule, redirectToLanding } = useAppRedirect();
	// Account

	const [drawerState, setDrawerState] = useState({
		drawerOpen: null,
		drawerWidth: drawerWidth || 300,
	});

	// const [menuStateEx, setMenuStateEx] = useState({
	// 	menus: MockMenus,
	// 	selectedItem: "A01",
	// });

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
			console.debug(`module ${module.JobID} selected`);
			redirectToModule(module.WebName);
		},
		[redirectToModule]
	);

	const handleHomeClick = useCallback(() => {
		setMenuState((prev) => ({
			...prev,
			menuItemSelected: null,
		}));
		console.debug("home clicked");
		redirectToLanding();
	}, [redirectToLanding]);

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

	return (
		<AppFrameContext.Provider
			value={{
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
			}}>
			{children}
		</AppFrameContext.Provider>
	);
};

AppFrameProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	drawerWidth: PropTypes.number,
};

export default AppFrameProvider;
