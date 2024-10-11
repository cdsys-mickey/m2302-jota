import { Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import FlexBox from "@/shared-components/FlexBox";

const ModuleHeading = (props) => {
	const {
		// children 就是 icon
		icon,
		// children,
		// variant = "h5",
		size = "lg",
		text,
		className,
		style,
		iconColor,
		cssColor,
		typoProps,
		sx = [],
		// METHODS
		onClick,
		// ...rest
	} = props;
	const Icon = icon;

	const handleClick = useCallback(
		(e) => {
			if (onClick) {
				onClick(e);
			} else {
				console.log("onClick not defined");
			}
		},
		[onClick]
	);

	const fontSize = useMemo(() => {
		switch (size) {
			case "sm":
				return "small";
			case "md":
				return "medium";
			default:
				return "large";
		}
	}, [size]);

	const variant = useMemo(() => {
		switch (size) {
			case "sm":
				return "h6";
			case "md":
				return "h6";
			default:
				return "h5";
		}
	}, [size]);

	const textMarginLeft = useMemo(() => {
		switch (size) {
			case "sm":
				return 0.4;
			case "md":
				return 0.5;
			default:
				return 1;
		}
	}, [size]);

	return (
		<FlexBox
			alignItems="center"
			sx={[
				(theme) => ({
					whiteSpace: "noWrap",
					// color: theme.palette.text.secondary,
					color: theme.palette.text.primary,
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
			{icon && (
				<Icon
					fontSize={fontSize}
				// htmlColor={iconColor || cssColor}
				/>
			)}
			<Typography
				variant={variant}
				sx={[
					(theme) => ({
						marginLeft: textMarginLeft,
						color: theme.palette.text.secondary,
					}),
					// cssColor && {
					// 	color: cssColor,
					// },
				]}
				style={{
					...style,
				}}
				onClick={handleClick}
				{...typoProps}>
				{text}
			</Typography>
		</FlexBox>
	);
};

export default ModuleHeading;
