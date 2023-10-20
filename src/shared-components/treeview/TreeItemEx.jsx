import { TreeItem } from "@mui/lab";
import { treeItemClasses } from "@mui/lab/TreeItem";
import { Tooltip, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import FlexBox from "@/shared-components/FlexBox";
import TooltipBox from "@/shared-components/TooltipBox";
import TooltipFlexBox from "@/shared-components/TooltipFlexBox";
import TreeItemContentEx from "./TreeItemContentEx";

/**
 * TreeItem 的二次封裝，主要目的是為了替換 ContentComponent
 * {
 * 	nodeId: 		鍵值,
 * 	primary: 		主要文字,
 * 	secondary: 		輔助文字,
 * 	IconComponent:	圖示,
 *  IconComponentProps: 圖式屬性
 * 	color: 			選取時主色,
 * 	bgColor: 		選取時背景色
 * }
 */
const TreeItemEx = styled(
	({
		children,
		IconComponent,
		IconComponentProps,
		primary,
		secondary,
		color,
		bgColor,
		level = 1,
		iconTooltip,
		ContentProps = {
			toggleExpandedOnLabelClick: false,
			selectOnIconClick: false,
		},
		sx = [],
		...other
	}) => {
		const showCaption = useMemo(() => {
			return secondary && typeof secondary === "string";
		}, [secondary]);

		const showComponent = useMemo(() => {
			return secondary && typeof secondary !== "string";
		}, [secondary]);
		return (
			<TreeItem
				ContentComponent={TreeItemContentEx}
				ContentProps={ContentProps}
				// sx={{
				// 	pl: 0.5 * level,
				// }}
				sx={[
					(theme) => ({
						//Item Styles
						marginLeft: theme.spacing(level - 1),
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				label={
					<FlexBox py={0.5} alignItems="center">
						{/* <Tooltip title={!iconTooltip ? "" : iconTooltip}>
							<Box
								component={IconComponent}
								// sx={{ mr: 1 }}
								mr={0.5}
								{...IconComponentProps}
							/>
						</Tooltip> */}

						<TooltipFlexBox
							title={!iconTooltip ? "" : iconTooltip}
							BoxProps={{ alignItems: "center" }}>
							<IconComponent
								sx={{ mr: 1 }}
								{...IconComponentProps}
							/>
						</TooltipFlexBox>

						<Typography
							variant="body2"
							sx={{ fontWeight: "inherit", flexGrow: 1 }}>
							{primary}
						</Typography>

						{showCaption && (
							<Typography variant="caption" color="inherit">
								{secondary}
							</Typography>
						)}
						{showComponent && secondary}
					</FlexBox>
				}
				style={{
					"--tree-view-color": color,
					"--tree-view-bg-color": bgColor,
				}}
				{...other}>
				{children}
			</TreeItem>
		);
	}
)(({ theme }) => ({
	color: theme.palette.text.primary,
	[`& .${treeItemClasses.content}`]: {
		color: theme.palette.text.primary,
		borderTopRightRadius: theme.spacing(2),
		borderBottomRightRadius: theme.spacing(2),
		paddingRight: theme.spacing(1),
		fontWeight: theme.typography.fontWeightMedium,
		"&.Mui-expanded": {
			fontWeight: theme.typography.fontWeightRegular,
		},
		"&:hover": {
			backgroundColor: theme.palette.action.hover,
		},
		"&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
			backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
			color: "var(--tree-view-color)",
			fontWeight: 600,
		},
		[`& .${treeItemClasses.label}`]: {
			fontWeight: "inherit",
			color: "inherit",
		},
	},
}));

TreeItemEx.propTypes = {
	bgColor: PropTypes.string,
	color: PropTypes.string,
	IconComponent: PropTypes.elementType.isRequired,
	secondary: PropTypes.string,
	primary: PropTypes.string,
	// primary: PropTypes.string.isRequired,
};

export default React.memo(TreeItemEx);
