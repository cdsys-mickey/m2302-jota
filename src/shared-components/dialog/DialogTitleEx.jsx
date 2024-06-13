import React, { useMemo } from "react";
import { DialogTitle, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import DialogTitleButtonsBox from "@/shared-components/dialog/DialogTitleButtonsBox";
import FlexBox from "@/shared-components/FlexBox";
import HoverableListItem from "@/shared-components/HoverableListItem";
import { memo, forwardRef } from "react";
import PropTypes from "prop-types";

const DialogTitleEx = memo(
	forwardRef((props, ref) => {
		const {
			size = "medium",
			hideCloseButton,
			children,
			onClose,
			closeText = "",
			onReturn,
			returnText = "",
			returnIcon,
			buttons,
			ButtonsComponent,
			closebuttonProps = { size: "small" },
			padding = "8px 24px",
			sx = [],
			yOffset = 4,
			xOffset = 4,
			...rest
		} = props;

		const doRenderButtonsComponent = useMemo(() => {
			return ButtonsComponent && !buttons;
		}, [ButtonsComponent, buttons]);

		const iconSize = useMemo(() => {
			return closebuttonProps?.size || "small";
		}, [closebuttonProps?.size]);

		const hasCloseButton = useMemo(() => {
			return !hideCloseButton && !!onClose;
		}, [hideCloseButton, onClose]);

		return (
			<DialogTitle
				ref={ref}
				sx={[
					(theme) => ({
						display: "flex",
						...(padding && {
							padding,
						}),
						...(onReturn && {
							paddingLeft: "50px",
						}),
						minHeight: `calc(${theme.spacing(5)} + ${
							yOffset * 2
						}px)`,
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				{!!onReturn && (
					<FlexBox
						sx={[
							(theme) => ({
								position: "absolute",
								left: xOffset,
								top: yOffset,
							}),
						]}>
						<Tooltip title={returnText || ""}>
							<IconButton
								// disableRipple
								aria-label="back"
								onClick={onReturn}
								size={size}
								sx={(theme) => ({
									color: (theme) => theme.palette.grey[500],
									// marginLeft: theme.spacing(1),
								})}>
								<ArrowBackIosNewIcon />
							</IconButton>
						</Tooltip>
					</FlexBox>
				)}

				{children}
				<FlexBox
					alignItems="center"
					sx={[
						(theme) => ({
							position: "absolute",
							right: xOffset,
							top: yOffset,
							minHeight: "40px",
							...(!hasCloseButton && {
								paddingRight: "20px",
							}),
						}),
					]}>
					{buttons && (
						<DialogTitleButtonsBox>{buttons}</DialogTitleButtonsBox>
					)}
					{doRenderButtonsComponent && (
						<DialogTitleButtonsBox>
							<ButtonsComponent />
						</DialogTitleButtonsBox>
					)}
					{hasCloseButton && (
						<Tooltip title={closeText || ""}>
							<IconButton
								// disableRipple
								aria-label="close"
								onClick={onClose}
								sx={(theme) => ({
									color: (theme) => theme.palette.grey[500],
									marginLeft: theme.spacing(1),
								})}
								size={size}>
								<CloseIcon />
							</IconButton>
						</Tooltip>
					)}
				</FlexBox>
			</DialogTitle>
		);
	})
);
DialogTitleEx.propTypes = {
	size: PropTypes.oneOf(["medium", "small"]),
	hideCloseButton: PropTypes.bool,
};
DialogTitleEx.displayName = "DialogTitleEx";

export default DialogTitleEx;
