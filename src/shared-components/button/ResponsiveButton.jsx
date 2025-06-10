import { Button, IconButton, Tooltip } from "@mui/material";
import React, { memo, forwardRef, useMemo } from "react";
import ButtonExView from "@/shared-components/button/ButtonExView";

import PropTypes from "prop-types";
import { useContext } from "react";
import { ResponsiveContext } from "../../shared-contexts/responsive/ResponsiveContext";

const ResponsiveButton = memo(
	forwardRef((props, ref) => {
		const {
			children,
			startIcon,
			endIcon,
			mobileText,
			size = "small",
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
			<Button
				size={size}
				ref={ref}
				{...(doStartIcon && {
					startIcon,
				})}
				{...(doEndIcon && {
					endIcon,
				})}
				{...rest}>
				{text}
			</Button>
		);
	})
);

ResponsiveButton.propTypes = {
	children: PropTypes.node,
	startIcon: PropTypes.object,
	endIcon: PropTypes.object,
	size: PropTypes.string,
	mobileText: PropTypes.string,
	useIconButton: PropTypes.bool,
};

export default ResponsiveButton;
