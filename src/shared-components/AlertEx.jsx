import { Alert, AlertTitle } from "@mui/material";
import { useMemo } from "react";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { memo } from "react";

const AlertEx = memo(
	forwardRef((props, ref) => {
		const {
			dense = false,
			severity,
			size = "small",
			sx = [],
			title,
			transparent,
			children,
			flex,
			maxWidth,
			minWidth,
			defaultText = "(空白)",
			error,
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

		const _severity = useMemo(() => {
			return error ? "error" : severity;
		}, [error, severity]);

		const memoisedMessage = useMemo(() => {
			return (
				children || error?.message || error?.statusText || defaultText
			);
		}, [children, defaultText, error?.message, error?.statusText]);

		return (
			<Alert
				ref={ref}
				severity={_severity}
				sx={[
					{
						justifyContent: "center",
					},
					dense && {
						"&.MuiPaper-root": {
							padding: 0
						},
						"& .MuiAlert-icon": {
							padding: "4px 0 4px 8px",
							marginRight: "4px"
						},
						"& .MuiAlert-message": {
							padding: "4px 12px 4px 4px"
						}
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
					minWidth && {
						minWidth,
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
				{title && <AlertTitle>{title}</AlertTitle>}
				{memoisedMessage}
			</Alert>
		);
	})
);

AlertEx.displayName = "AlertEx";
AlertEx.propTypes = {
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	flex: PropTypes.bool,
	transparent: PropTypes.bool,
	dense: PropTypes.bool,
	error: PropTypes.object,
	severity: PropTypes.string,
	defaultText: PropTypes.string,
	size: PropTypes.string,
	title: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
export default AlertEx;
