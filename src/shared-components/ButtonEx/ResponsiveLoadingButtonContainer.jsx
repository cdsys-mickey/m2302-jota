import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { LoadingButton } from "@mui/lab";
import { IconButton, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext, useMemo } from "react";

const ResponsiveLoadingButtonContainer = memo(
	forwardRef((props, ref) => {
		const {
			children,
			startIcon,
			endIcon,
			mobileText,
			// hideIcon = true,
			// hideText = false,
			useIconButton = false,
			sx = [],
			tooltip,
			...rest
		} = props;
		const { mobile } = useContext(ResponsiveContext);

		const icon = useMemo(() => {
			return startIcon || endIcon;
		}, [endIcon, startIcon]);

		const doIconButton = useMemo(
			() => mobile && icon && useIconButton,
			[icon, mobile, useIconButton]
		);

		const doStartIcon = useMemo(
			() => startIcon && (!mobile || useIconButton),
			[useIconButton, mobile, startIcon]
		);

		const doEndIcon = useMemo(
			() => endIcon && (!mobile || useIconButton),
			[endIcon, useIconButton, mobile]
		);

		const text = useMemo(() => {
			if (mobile) {
				if (useIconButton) {
					return false;
				}
				return mobileText || children;
			}
			return children;
		}, [children, useIconButton, mobile, mobileText]);

		if (doIconButton) {
			return (
				<Tooltip title={children}>
					<IconButton {...rest}>{icon}</IconButton>
				</Tooltip>
			);
		}

		return (
			<Tooltip title={tooltip}>
				<LoadingButton
					ref={ref}
					size="small"
					sx={[
						...(Array.isArray(sx) ? sx : [sx]),
					]}
					{...(doStartIcon && {
						startIcon,
					})}
					{...(doEndIcon && {
						endIcon,
					})}
					{...rest}>
					{text}
				</LoadingButton>
			</Tooltip>
		);
	})
);

ResponsiveLoadingButtonContainer.propTypes = {
	children: PropTypes.node,
	startIcon: PropTypes.object,
	endIcon: PropTypes.object,
	mobileText: PropTypes.string,
	tooltip: PropTypes.string,
	useIconButton: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default ResponsiveLoadingButtonContainer;
