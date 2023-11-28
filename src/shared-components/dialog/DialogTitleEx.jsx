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

const DialogTitleEx = memo(
	forwardRef((props, ref) => {
		const {
			children,
			onClose,
			closeText = "",
			onReturn,
			returnText = "",
			returnIcon,
			buttons,
			buttonsComponent,
			closeButtonProps = { size: "small" },
			padding,
			sx = [],
			yOffset = 0,
			xOffset = 0,
			...rest
		} = props;

		const ButtonsComponent = buttonsComponent;

		const doRenderButtonsComponent = useMemo(() => {
			return ButtonsComponent && !buttons;
		}, [ButtonsComponent, buttons]);

		const iconSize = useMemo(() => {
			return closeButtonProps?.size || "small";
		}, [closeButtonProps?.size]);

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
							paddingLeft: "60px",
						}),
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				{onReturn && (
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
								disableRipple
								aria-label="back"
								onClick={onReturn}
								sx={(theme) => ({
									color: (theme) => theme.palette.grey[500],
									marginLeft: theme.spacing(1),
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
							...(!onClose && {
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
					{onClose && (
						<Tooltip title={closeText || ""}>
							<IconButton
								disableRipple
								aria-label="close"
								onClick={onClose}
								sx={(theme) => ({
									color: (theme) => theme.palette.grey[500],
									marginLeft: theme.spacing(1),
								})}
								// {...closeButtonProps}
							>
								<CloseIcon />
							</IconButton>
						</Tooltip>
					)}
				</FlexBox>
			</DialogTitle>
		);
	})
);

DialogTitleEx.displayName = "DialogTitleEx";

export default DialogTitleEx;
