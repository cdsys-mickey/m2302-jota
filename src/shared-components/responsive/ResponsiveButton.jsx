import { Button, IconButton, Tooltip } from "@mui/material";
import React, { memo, forwardRef, useMemo } from "react";
import ButtonEx from "@/shared-components/button/ButtonEx";
import useResponsive from "@/shared-contexts/responsive/useResponsive";

import PropTypes from "prop-types";

const ResponsiveButton = memo(
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
		const { mobile } = useResponsive();

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
			<ButtonEx
				ref={ref}
				{...(doStartIcon && {
					startIcon,
				})}
				{...(doEndIcon && {
					endIcon,
				})}
				{...rest}>
				{text}
			</ButtonEx>
		);
	})
);

ResponsiveButton.propTypes = {
	children: PropTypes.node,
	startIcon: PropTypes.object,
	endIcon: PropTypes.object,
	mobileText: PropTypes.string,
	useIconButton: PropTypes.bool,
};

export default ResponsiveButton;
