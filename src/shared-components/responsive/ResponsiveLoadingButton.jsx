import { Button, IconButton, Tooltip } from "@mui/material";
import React, { memo, forwardRef, useMemo } from "react";
import ButtonEx from "@/shared-components/button/ButtonEx";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ResponsiveContext } from "../../shared-contexts/responsive/ResponsiveContext";

const ResponsiveLoadingButton = memo(
	forwardRef((props, ref) => {
		const {
			children,
			startIcon,
			endIcon,
			mobileText,
			// hideIcon = true,
			// hideText = false,
			useIconButton = false,
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
			<LoadingButton
				ref={ref}
				size="small"
				{...(doStartIcon && {
					startIcon,
				})}
				{...(doEndIcon && {
					endIcon,
				})}
				{...rest}>
				{text}
			</LoadingButton>
		);
	})
);

ResponsiveLoadingButton.propTypes = {
	children: PropTypes.node,
	startIcon: PropTypes.object,
	endIcon: PropTypes.object,
	mobileText: PropTypes.string,
	useIconButton: PropTypes.bool,
};

export default ResponsiveLoadingButton;
