import { cyan, grey } from "@mui/material/colors";
import { Box, styled } from "@mui/system";
import Colors from "@/modules/Colors.mjs";
import { useMemo } from "react";
import Arrays from "@/shared-modules/Arrays";

const HoverableListItem = styled(Box, {
	shouldForwardProp: (prop) =>
		!Arrays.parse(`transparent,disabled,selected,hoverStyles,disabledStyles,borderBottom,hideCursor`)
			.includes(prop),
})(
	({
		theme,
		onClick,
		disabled = false,
		transparent = false,
		borderBottom = false,
		selected = false,
		hideCursor = false,
		selectedStyles = {
			backgroundColor: cyan[200],
		},
		hoverStyles = {
			backgroundColor: "rgba(0, 0, 0, 0.03)",
			boxShadow: "1px 2px 3px rgb(0 0 0 / 20%)",
		},
		disabledStyles = {
			boxShadow: "1px 2px 3px rgb(0 0 0 / 20%) inset",
			backgroundColor: "rgb(104 67 11 / 28%)",
			color: "rgb(0 0 0 / 40%)",
		},
	}) => {
		const showHoverStyles = useMemo(() => {
			return !disabled && !transparent && hoverStyles && onClick;
		}, [disabled, hoverStyles, onClick, transparent]);

		const showDisabledStyles = useMemo(() => {
			return disabled && disabledStyles;
		}, [disabled, disabledStyles]);

		const showCursor = useMemo(() => {
			return onClick && !hideCursor;
		}, [hideCursor, onClick])

		return {
			position: "relative",
			// padding: theme.spacing(1),
			// paddingBottom: 0,

			// "&:hover": {
			// 	...(showHoverStyles && {
			// 		//default hover styles
			// 		...hoverStyles,
			// 	}),
			// },
			"&:hover::after": {
				content: '""',
				position: "absolute",
				inset: 0,
				pointerEvents: "none",
				borderRadius: "inherit",
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
				borderBottom: `1px solid ${Colors.TOOLBAR}`,
			}),
			cursor: showCursor ? "pointer" : "inherit",
		};
	}
);

export default HoverableListItem;
