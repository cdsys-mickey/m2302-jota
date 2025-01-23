import { InputBase, styled } from "@mui/material";
import { useMemo } from "react";

const OUT_STYLE =
	"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)";

const IN_STYLE =
	"inset 0px 2px 1px -1px rgba(0,0,0,0.2), inset 0px 1px 1px 0px rgba(0,0,0,0.14), inset 0px 1px 3px 0px rgba(0,0,0,0.12)";

const StyledInputBase = styled(InputBase, {
	shouldForwardProp: (prop) =>
		!`width,square,shadowStyle,shadow,backgroundColor,hoverBackgroundColor,focusBackgroundColor,searchIconPlacement`
			.trim()
			.split(/\s*,\s*/)
			.includes(prop),
})(
	({
		theme,
		width,
		// width = "26ch",
		square = false,
		shadowStyle,
		shadow = "always",
		backgroundColor = "rgb(0 0 0 / 5%)",
		hoverBackgroundColor,
		focusBackgroundColor,
		breakpoint = "md",
		searchIconPlacement,
	}) => {
		const alwaysIn = useMemo(
			() => shadowStyle === "in" && shadow === "always",
			[shadow, shadowStyle]
		);

		const alwaysOut = useMemo(
			() => shadowStyle === "out" && shadow === "always",
			[shadow, shadowStyle]
		);

		const focusIn = useMemo(
			() => shadowStyle === "in" && shadow === "focus",
			[shadow, shadowStyle]
		);

		const focusOut = useMemo(
			() => shadowStyle === "out" && shadow === "focus",
			[shadow, shadowStyle]
		);

		return {
			color: "inherit",
			border: "rgba(0, 0, 0, 0.12)",
			"& .MuiInputBase-input": {
				padding: theme.spacing(1, 1, 1, 0),
				...(!searchIconPlacement || searchIconPlacement === "none" && ({
					paddingLeft: theme.spacing(2),
				})),
				...(searchIconPlacement === "left" && {
					paddingLeft: `calc(1em + ${theme.spacing(4)})`,
				}),
				paddingRight: theme.spacing(2),
				...(searchIconPlacement === "right" && {
					paddingRight: `calc(1em + ${theme.spacing(4)})`,
				}),

				transition: theme.transitions.create([
					"box-shadow",
					"width",
					"background-color",
				]),
				width: `100%`,
				// width: `calc(100% - ${theme.spacing(4)})`,
				...(width && (
					{
						[theme.breakpoints.up(breakpoint)]: {
							width: width,
						},
					}
				)),
				...(alwaysIn && {
					boxShadow: IN_STYLE,
				}),
				...(alwaysOut && {
					boxShadow: OUT_STYLE,
				}),
				borderRadius: square ? theme.shape.borderRadius : "36px",
			},
			"& input": {
				backgroundColor,
			},
			"& .MuiInputBase-input:hover": {
				backgroundColor: hoverBackgroundColor || backgroundColor,
			},
			"& .MuiInputBase-input:focus": {
				backgroundColor: focusBackgroundColor || backgroundColor,
				...(focusIn && {
					// boxShadow: "inset 1px 2px 4px rgb(0 0 0 / 29%)",
					boxShadow: IN_STYLE,
				}),
				...(focusOut && {
					boxShadow: OUT_STYLE,
				}),
			},
		};
	}
);

export default StyledInputBase;
