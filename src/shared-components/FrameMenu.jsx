import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import {
	Box,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/system";
import { useSessionContext } from "@/contexts/SessionContext";
import React, { forwardRef, memo, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import useRedirect from "@/shared-hooks/useRedirect";
import IconEx from "./IconEx";
import { useNavigate } from "react-router-dom";

// const FrameMenuListItemNormal = styled(ListItemButton, {
// 	name: "FrameMenuListItem",
// 	slot: "Normal",
// })(({ inverted, theme, selected }) => ({}));

// const FrameMenuListItemInverted = styled(ListItemButton, {
// 	name: "FrameMenuListItem",
// 	slot: "Inverted",
// })(({ inverted, theme, selected }) => ({
// 	"&.Mui-selected": {
// 		backgroundColor: alpha(theme.palette.primary.light, 0.5),
// 	},
// }));

// const FrameMenuListItem = forwardRef((props, ref) => {
// 	const { inverted, ...rest } = props;
// 	if (inverted) {
// 		return <FrameMenuListItemInverted ref={ref} {...rest} />;
// 	}
// 	return <FrameMenuListItemNormal ref={ref} {...rest} />;
// });

const FrameMenuListItemButton = styled(ListItemButton, {
	name: "ListItemButton",
	slot: "FrameMenu",
	shouldForwardProp: (prop) => prop !== "inverted",
})(({ inverted, theme, selected }) => ({
	...(inverted && {
		"&.Mui-selected": {
			backgroundColor: alpha(theme.palette.primary.light, 0.5),
		},
	}),
}));

const FrameMenuListItemIcon = styled(ListItemIcon, {
	name: "ListItemIcon",
	slot: "FrameMenu",
})(({ inverted, theme }) => ({
	minWidth: "40px",
}));

const FrameMenuListItemText = styled(ListItemText, {
	name: "FrameMenuListItemText",
	slot: "Wrapper",
	shouldForwardProp: (prop) => {
		return prop !== "inverted";
	},
})(({ inverted, theme }) => ({
	"& .MuiListItemText-primary": {
		color: inverted
			? theme.palette.primary.contrastText
			: theme.palette.text.primary,
	},
}));

export const FrameMenu = memo((props) => {
	const {
		iconClass,
		listClass,
		name = "選單",
		headerIcon = MenuIcon,
		// headerOpenIcon = MenuOpenIcon,
		headerOpenIcon,
		items,
		modules,
		showTooltip = false,
		dense = false,
		className,
		// from context,
		// getFullPath,
		// location,
		pathname,
		// onRedirect,
		height = 500,
		protectedZone,
		drawerOpen,
		menuIcon = <MenuIcon />,
		menuOpenIcon = <MenuOpenIcon />,
		// METHODS
		// menuIconTooltipOpen,
		onToggleDrawerOpen,
		// onMenuIconClick,
		// onMenuIconHover,
		// onMenuIconLeave,
		// handleItemClick,
		// handleModuleClick,
		// isItemSelected,
		// isModuleSelected,
		// PROPS
		inverted = false,
		loading,
		...rest
	} = props;

	const [state, setState] = useState({
		menuIconTooltipOpen: false,
		hoverDirty: false,
	});
	const { redirectTo } = useRedirect();
	const HeaderIcon = headerIcon;
	const HeaderOpenIcon = headerOpenIcon;

	const onMenuIconHover = useCallback(() => {
		if (!state.hoverDirty) {
			setState({
				menuIconTooltipOpen: true,
				hoverDirty: false,
			});
		}
	}, [state.hoverDirty]);

	const onMenuIconClick = useCallback(() => {
		setState({
			menuIconTooltipOpen: false,
			hoverDirty: true,
		});
		if (!onToggleDrawerOpen) {
			console.error("onToggleDrawerOpen is not defined");
		} else {
			onToggleDrawerOpen();
		}
	}, [onToggleDrawerOpen]);

	const onMenuIconLeave = useCallback(() => {
		setState((prevState) => ({
			menuIconTooltipOpen: false,
			hoverDirty: false,
		}));
	}, []);

	const handleItemClick = useCallback(
		(path) => {
			redirectTo(path);
		},
		[redirectTo]
	);
	// const handleItemClick = useCallback(
	// 	(path) => {
	// 		onRedirect(path);
	// 	},
	// 	[onRedirect]
	// );

	const isItemSelected = useCallback(
		(item) => {
			// let fullPath = getFullPath(item.path, true);
			// let hit = pathname === fullPath;
			// console.debug(`pathname: ${pathname}, item.path: ${item.path}`);
			let hit = pathname === item.path;
			return hit;
		},
		[pathname]
	);

	return (
		<Box>
			<List sx={{ paddingTop: 0 }}>
				{/* menuIcon */}
				<Tooltip
					title={drawerOpen ? `收合${name}` : `展開${name}`}
					open={state.menuIconTooltipOpen}
					disableFocusListener
					// disableHoverListener
					disableTouchListener
					placement="right"
					arrow>
					<FrameMenuListItemButton
						inverted={inverted}
						dense={dense}
						disableRipple={false}
						onMouseOver={onMenuIconHover}
						onMouseOut={onMenuIconLeave}
						onClick={onMenuIconClick}>
						<FrameMenuListItemIcon>
							{drawerOpen ? (
								<IconEx
									className="expanded"
									icon={HeaderOpenIcon || HeaderIcon}
									inverted={inverted}
								/>
							) : (
								<IconEx
									className="collapsed"
									icon={HeaderIcon}
									inverted={inverted}
								/>
							)}
						</FrameMenuListItemIcon>
						<FrameMenuListItemText
							inverted={inverted}
							primary={`${name}`}
						/>
					</FrameMenuListItemButton>
				</Tooltip>
				<Divider />
				{/* items */}
				{items &&
					items.map((item, index) =>
						item === "-" ? (
							<Divider key={`divider-${index}`} />
						) : (
							<Tooltip
								arrow
								title={item.text}
								key={`item-${item.path}`}
								placement="right"
								disableHoverListener={
									!showTooltip || drawerOpen
								}>
								<FrameMenuListItemButton
									inverted={inverted}
									dense={dense}
									// button
									disableRipple={false}
									selected={
										isItemSelected
											? isItemSelected(item)
											: false
									}
									onClick={() => handleItemClick(item.path)}>
									<FrameMenuListItemIcon>
										{/* <FrameMenuIcon /> */}
										<IconEx
											icon={item.icon}
											inverted={inverted}
										/>
									</FrameMenuListItemIcon>
									<FrameMenuListItemText
										inverted={inverted}
										primary={item.text}
									/>
								</FrameMenuListItemButton>
							</Tooltip>
						)
					)}
				{/* <Divider /> */}
				{/* modules */}
				{/* {loading && loading === LoadingState.LOADING && (
					<FlexBox
						fullWidth
						justifyContent="center"
						alignItems="center"
						minHeight="36px">
						<LoadingTypography />
					</FlexBox>
				)} */}
			</List>
		</Box>
	);
});

export default FrameMenu;

export const FrameMenuContainer = (props) => {
	const { ...rest } = props;
	const location = useLocation();
	const sessions = useSessionContext();

	return (
		<FrameMenu
			// from context
			// PROPS
			items={sessions.menuItems}
			drawerOpen={sessions.drawerOpen}
			pathname={location.pathname}
			{...rest}
		/>
	);
};
