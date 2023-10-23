import useResponsive from "@/shared-contexts/useResponsive";
import { createContext, useEffect, useMemo, useState } from "react";
import useRedirect from "@/shared-hooks/useRedirect";
import { useCallback } from "react";
import Auth from "@/modules/md-auth";
import { MockMenus } from "@/mocks/mock-menus";

export const AppFrameContext = createContext();

export const AppFrameProvider = (props) => {
	const { children } = props;
	const { mobile } = useResponsive();
	const { redirectTo } = useRedirect();
	// Account

	const [drawerState, setDrawerState] = useState({
		drawerOpen: null,
	});

	const [menuState, setMenuState] = useState({
		menus: MockMenus,
		selectedItem: "A01",
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

	const handleSelectJob = useCallback(
		(itemId) => {
			const item = Auth.getItemById(menuState.menus, itemId);
			if (item) {
				setMenuState((prev) => ({
					...prev,
					selectedItem: itemId,
				}));

				if (item?.path) {
					redirectTo(item.path);
				}
			}
		},
		[menuState.menus, redirectTo]
	);

	const handleMenuItemClick = useCallback(
		(itemId) => () => {
			console.log("item clicked", itemId);

			handleSelectJob(itemId);
		},
		[handleSelectJob]
	);

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
				...menuState,
				handleMenuItemClick,
				//
				...accordionState,
				handleAccordionChange,
				// Account
				// accountAnchorEl,
				// handleAccountClick,
				// handleAccountMenuClose,
				handleSelectJob,
			}}>
			{children}
		</AppFrameContext.Provider>
	);
};
