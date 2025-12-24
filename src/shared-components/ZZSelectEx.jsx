import { memo, useCallback, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import ExpandMoreButton from "@/shared-components/ExpandMoreButton";
import { FlexBox } from "shared-components";

const renderVariant = (size) => {
	switch (size) {
		case "lg":
			return "h6";
		case "sm":
			return "body2";
		default:
		case "md":
			return "body1";
	}
};

const renderButtonFontSize = (size) => {
	switch (size) {
		case "lg":
			return "medium";
		case "sm":
		case "md":
		default:
			return "small";
	}
};

const rootStyles = (theme) => ({
	cursor: "pointer",
	borderRadius: theme.spacing(0.5),
	paddingLeft: theme.spacing(1),
	paddingRight: theme.spacing(0.5),
	"&:hover": {
		backgroundColor: theme.palette.action.hover,
	},
});

const expandedStyles = (theme) => ({
	backgroundColor: theme.palette.action.hover,
});

/**
 * 結合 ExpandMoreButton 與 Menu，功能上與 Select 類似，但外觀更貼近現代 UI
 */
const ZZSelectEx = memo(
	({
		items,
		value,
		tooltip,
		size = "md",
		labelStyles,
		PaperProps,
		MenuListProps,
		MenuItemProps,
		TooltipProps,
		// menuRef,
		// handleCancelExpand,
		// handleToggleExpand,
		// METHODS
		getText,
		onChange,
	}) => {
		const [state, setState] = useState({
			expanded: false,
			menuRef: null,
		});

		const handleToggleExpand = useCallback((e) => {
			setState((prev) => ({
				...prev,
				expanded: !prev.expanded,
				menuRef: e.currentTarget,
			}));
		}, []);

		const handleCancelExpand = useCallback(() => {
			setState((prev) => ({
				...prev,
				expanded: false,
			}));
		}, []);

		return (
			<>
				<Tooltip title={tooltip} {...TooltipProps}>
					<FlexBox
						inline
						sx={[
							(theme) => ({
								...rootStyles(theme),
								...(state.expanded && {
									...expandedStyles(theme),
								}),
							}),
						]}
						onClick={handleToggleExpand}>
						<FlexBox flex={1} justifyContent="flex-end">
							<Typography
								variant={renderVariant(size)}
								sx={[labelStyles]}>
								{getText ? getText(value) : value}
							</Typography>
						</FlexBox>
						<FlexBox alignItems="center">
							{/* <Tooltip title={tooltip}> */}
							<ExpandMoreButton
								sx={{ padding: 0 }}
								expanded={state.expanded}>
								<ExpandMoreIcon
									fontSize={renderButtonFontSize(size)}
								/>
							</ExpandMoreButton>
							{/* </Tooltip> */}
						</FlexBox>
					</FlexBox>
				</Tooltip>
				<Menu
					id="long-menu"
					MenuListProps={MenuListProps}
					anchorEl={state.menuRef}
					open={!!state.menuRef && state.expanded}
					onClose={handleCancelExpand}
					transformOrigin={{
						horizontal: "right",
						vertical: "top",
					}}
					anchorOrigin={{
						horizontal: "right",
						vertical: "bottom",
					}}
					PaperProps={PaperProps}>
					{items &&
						items.map((key) => (
							<MenuItem
								key={key}
								selected={key === value}
								onClick={() => {
									handleCancelExpand();
									onChange(key);
								}}
								{...MenuItemProps}>
								{getText ? getText(key) : key}
							</MenuItem>
						))}
				</Menu>
			</>
		);
	}
);
ZZSelectEx.displayName = "ZZSelectEx";
export default ZZSelectEx;
