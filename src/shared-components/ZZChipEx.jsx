import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import { Chip } from "@mui/material";

// Others
import clsx from "clsx";

// Constants
import { Severity } from "@/shared-constants/severity";

const VARIANT_DEFAULT = "default";
const VARIANT_OUTLINED = "outlined";
// const COLOR_DEFAULT = "default";
// const COLOR_PRIMARY = "primary";
// const COLOR_SECONDARY = "secondary";

const useStyles = makeStyles((theme) => ({
	root: {},
	defaultError: {
		backgroundColor: "#f44336",
		color: "#fff",
	},
	defaultWarning: {
		backgroundColor: "#ff9800",
		color: "#fff",
	},
	defaultInfo: {
		backgroundColor: "#2196f3",
		color: "#fff",
	},
	defaultSuccess: {
		backgroundColor: "#4caf50",
		color: "#fff",
	},
	outlinedError: {
		color: "#f44336",
		borderColor: "#f44336",
		backgroundColor: "rgb(253, 236, 234)",
	},
	outlinedWarning: {
		color: "#ff9800",
		borderColor: "#ff9800",
		backgroundColor: "rgb(255, 244, 229)",
	},
	outlinedInfo: {
		color: "#2196f3",
		borderColor: "#2196f3",
		backgroundColor: "rgb(232, 244, 253)",
	},
	outlinedSuccess: {
		color: "#4caf50",
		borderColor: "#4caf50",
		backgroundColor: "rgb(237, 247, 237)",
	},
	square: {
		borderRadius: 0,
	},
	borderRadius: (props) => ({
		borderRadius: `${props.borderRadius}px`,
	}),
	htmlColor: (props) => ({
		backgroundColor: props.htmlColor,
	}),
	htmlTextColor: (props) => ({
		color: props.htmlTextColor,
	}),
}));
const ZZChipEx = ({
	variant = VARIANT_DEFAULT,
	color = "default",
	square = false,
	severity,
	className,
	children,
	htmlColor,
	htmlTextColor,
	borderRadius,
	sx = [],
	...rest
}) => {
	const classes = useStyles({
		htmlColor,
		htmlTextColor,
		borderRadius,
	});
	let severityClass;
	if (severity) {
		if (variant === VARIANT_OUTLINED) {
			switch (severity) {
				case Severity.ERROR:
					severityClass = classes.outlinedError;
					break;
				case Severity.WARNING:
					severityClass = classes.outlinedWarning;
					break;
				case Severity.INFO:
					severityClass = classes.outlinedInfo;
					break;
				case Severity.SUCCESS:
					severityClass = classes.outlinedSuccess;
					break;
				default:
					break;
			}
		} else if (variant === VARIANT_DEFAULT) {
			switch (severity) {
				case Severity.ERROR:
					severityClass = classes.defaultError;
					break;
				case Severity.WARNING:
					severityClass = classes.defaultWarning;
					break;
				case Severity.INFO:
					severityClass = classes.defaultInfo;
					break;
				case Severity.SUCCESS:
					severityClass = classes.defaultSuccess;
					break;
				default:
					break;
			}
		}
	}
	// console.log(`severityClass: ${severityClass}`);
	return (
		<Chip
			color={color}
			variant={variant}
			className={clsx(
				{
					[classes.square]: !!square,
					[classes.htmlColor]: !!htmlColor,
					[classes.htmlTextColor]: !!htmlTextColor,
					[classes.borderRadius]: !!borderRadius,
				},
				className,
				severityClass
			)}
			{...rest}
		/>
	);
};

export default ZZChipEx;
