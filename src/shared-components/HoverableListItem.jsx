import { cyan, grey } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import Colors from "@/modules/colors";
import { useMemo } from "react";

const HoverableListItem = styled(Box, {
	shouldForwardProp: (prop) =>
		!`transparent,disabled,selected,hoverStyles,disabledStyles,borderBottom`
			.trim()
			.split(/\s*,\s*/)
			.includes(prop),
})(
	({
		theme,
		disabled = false,
		transparent = false,
		borderBottom = false,
		selected = false,
		selectedStyles = {
			backgroundColor: cyan[100],
		},
		hoverStyles = {
			backgroundColor: grey[200],
			boxShadow: "1px 2px 3px rgb(0 0 0 / 20%)",
		},
		disabledStyles = {
			boxShadow: "1px 2px 3px rgb(0 0 0 / 20%) inset",
			backgroundColor: "rgb(104 67 11 / 28%)",
			color: "rgb(0 0 0 / 40%)",
		},
	}) => {
		const showHoverStyles = useMemo(() => {
			return !disabled && !transparent && hoverStyles;
		}, [disabled, hoverStyles, transparent]);

		const showDisabledStyles = useMemo(() => {
			return disabled && disabledStyles;
		}, [disabled, disabledStyles]);

		return {
			position: "relative",
			// padding: theme.spacing(1),
			// paddingBottom: 0,

			"&:hover": {
				...(showHoverStyles && {
					//default hover styles
					...hoverStyles,
				}),
			},
			...(showDisabledStyles && {
				//default disabled styles
				...disabledStyles,
			}),
			...(selected && {
				...selectedStyles,
			}),
			"& .secondary-action": {
				opacity: 0,
				// height: "100%",
				alignItems: "center",
				transition: theme.transitions.create("opacity", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
			},
			"&:hover .secondary-action": {
				opacity: "100%",
			},
			...(borderBottom && {
				borderBottom: `1px solid ${Colors.HOVER}`,
			}),
			cursor: "pointer",
		};
	}
);

export default HoverableListItem;
