import { Alert } from "@mui/material";
import { useMemo } from "react";
import { forwardRef } from "react";

const AlertEx = forwardRef((props, ref) => {
	const {
		size = "small",
		sx = [],
		transparent,
		children,
		flex,
		maxWidth,
		...rest
	} = props;

	const fontSize = useMemo(() => {
		switch (size) {
			case "large":
				return "150%";
			case "medium":
				return "100%";
			case "small":
				return null;
		}
	}, [size]);

	const iconSize = useMemo(() => {
		switch (size) {
			case "large":
				return "1.5em";
			case "medium":
				return "1.4em";
			case "small":
				return null;
		}
	}, [size]);

	const marginTop = useMemo(() => {
		switch (size) {
			case "large":
				return 1;
			case "medium":
				return 0.1;
			case "small":
				return 0;
		}
	}, [size]);

	return (
		<Alert
			ref={ref}
			sx={[
				{
					justifyContent: "center",
				},
				transparent && {
					padding: 0,
					backgroundColor: "transparent",
				},
				flex && {
					flex: flex,
				},
				maxWidth && {
					maxWidth,
				},
				fontSize && {
					fontSize,
				},
				iconSize && {
					"& .MuiAlert-icon .MuiSvgIcon-root": {
						marginTop: marginTop,
						height: iconSize,
						width: iconSize,
					},
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</Alert>
	);
});
AlertEx.displayName = "AlertEx";
export default AlertEx;
