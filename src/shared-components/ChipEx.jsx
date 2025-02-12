import { Chip } from "@mui/material";
// Constants
import MuiSeverity from "@/shared-modules/sd-mui-severity";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { styled } from "@mui/system";

const VARIANT_DEFAULT = "default";
const VARIANT_OUTLINED = "outlined";
// const COLOR_DEFAULT = "default";
// const COLOR_PRIMARY = "primary";
// const COLOR_SECONDARY = "secondary";

const makeStyles = () => {
	return {
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
	};
};

const ChipBox = styled("div", {
	shouldForwardProp: (prop) => ![].includes(prop)
})(({ theme }) => ({
	position: "relative"
}));

const SecondIconBox = styled("div", {
	shouldForwardProp: (prop) => ![].includes(prop)
})(({ theme, color }) => ({
	top: 0,
	right: 28,
	position: "absolute",
	zIndex: 10000,
	// color: theme.palette.getContrastText(color)

}));

const ChipEx = memo(
	forwardRef((props, ref) => {
		const {
			variant = VARIANT_DEFAULT,
			color = "default",
			square = false,
			severity,
			className,
			children,
			htmlColor,
			htmlTextColor,
			borderRadius,
			fullWidth = false,
			secondIcon,
			sx = [],
			...rest
		} = props;
		const classes = useMemo(
			() =>
				makeStyles({
					htmlColor,
					htmlTextColor,
					borderRadius,
				}),
			[borderRadius, htmlColor, htmlTextColor]
		);

		const _severityClass = useMemo(() => {
			let severityClass;
			if (severity) {
				if (variant === VARIANT_OUTLINED) {
					switch (severity) {
						case MuiSeverity.ERROR:
							severityClass = classes.outlinedError;
							break;
						case MuiSeverity.WARNING:
							severityClass = classes.outlinedWarning;
							break;
						case MuiSeverity.INFO:
							severityClass = classes.outlinedInfo;
							break;
						case MuiSeverity.SUCCESS:
							severityClass = classes.outlinedSuccess;
							break;
						default:
							break;
					}
				} else if (variant === VARIANT_DEFAULT) {
					switch (severity) {
						case MuiSeverity.ERROR:
							severityClass = classes.defaultError;
							break;
						case MuiSeverity.WARNING:
							severityClass = classes.defaultWarning;
							break;
						case MuiSeverity.INFO:
							severityClass = classes.defaultInfo;
							break;
						case MuiSeverity.SUCCESS:
							severityClass = classes.defaultSuccess;
							break;
						default:
							break;
					}
				}
			}
			return severityClass;
		}, [classes.defaultError, classes.defaultInfo, classes.defaultSuccess, classes.defaultWarning, classes.outlinedError, classes.outlinedInfo, classes.outlinedSuccess, classes.outlinedWarning, severity, variant])

		// console.log(`severityClass: ${severityClass}`);
		return (
			<ChipBox>
				<Chip
					ref={ref}
					color={color}
					variant={variant}
					sx={[
						_severityClass,
						!!square && classes.square,
						!!htmlColor && {
							backgroundColor: htmlColor,
						},
						!!htmlTextColor && {
							color: htmlTextColor,
						},
						!!borderRadius && {
							borderRadius: borderRadius,
						},
						{
							...(fullWidth && {
								width: "100%",
							}),
						},
						...(Array.isArray(sx) ? sx : [sx]),
					]}
					{...rest}
				/>
				{secondIcon && (
					<SecondIconBox color={color}>
						{secondIcon}
					</SecondIconBox>)
				}
			</ChipBox>
		);
	})
);

export default ChipEx;
