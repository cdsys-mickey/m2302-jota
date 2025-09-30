import { LoadingButton } from "@mui/lab";
import { Button, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";

const ButtonExView = memo(
	forwardRef((props, ref) => {
		const {
			sx = [],
			children,
			responsive,
			loading,
			mobile,
			startIcon,
			endIcon,
			mobileText,
			useIconButton = false,
			tooltip,
			dense = false,
			...rest
		} = props;

		const icon = useMemo(() => {
			return startIcon ?? endIcon;
		}, [endIcon, startIcon]);

		const isUseIconButton = useMemo(
			() => mobile && icon && useIconButton,
			[icon, mobile, useIconButton]
		);

		const isUseStartIcon = useMemo(
			() => startIcon && (!mobile || useIconButton),
			[useIconButton, mobile, startIcon]
		);

		const isUseEndIcon = useMemo(
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

		const ButtonComponent = useMemo(() => {
			if (loading != null) {
				return LoadingButton;
			}
			return Button;
		}, [loading]);

		if (isUseIconButton) {
			return (
				<TooltipWrapper title={tooltip}>
					<IconButton {...rest}>{icon}</IconButton>
				</TooltipWrapper>
			);
		}

		return (
			<TooltipWrapper title={tooltip}>
				<ButtonComponent
					ref={ref}
					size="small"
					sx={[
						(theme) => ({
							...dense && ({
								padding: 0,
								minWidth: theme.spacing(5)
							})
						}),
						...(Array.isArray(sx) ? sx : [sx]),
					]}
					{...(isUseStartIcon && {
						startIcon,
					})}
					{...(isUseEndIcon && {
						endIcon,
					})}
					loading={loading}
					// responsive={responsive}
					{...rest}
				>
					{text}
				</ButtonComponent>
			</TooltipWrapper>
		);
	})
);

ButtonExView.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	responsive: PropTypes.bool,
	loading: PropTypes.bool,
	mobile: PropTypes.bool,
	startIcon: PropTypes.object,
	endIcon: PropTypes.object,
	mobileText: PropTypes.string,
	tooltip: PropTypes.string,
	useIconButton: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	dense: PropTypes.bool
};

ButtonExView.displayName = "ButtonExView";
export default ButtonExView;
