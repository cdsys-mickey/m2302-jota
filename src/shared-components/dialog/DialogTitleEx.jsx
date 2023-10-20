import React, { useMemo } from "react";
import { DialogTitle, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import DialogTitleButtonsBox from "@/shared-components/dialog/DialogTitleButtonsBox";
import FlexBox from "@/shared-components/FlexBox";
import HoverableListItem from "@/shared-components/HoverableListItem";
import { memo } from "react";

const DialogTitleEx = memo((props) => {
	const {
		children,
		onClose,
		closeText = "關閉",
		onReturn,
		returnText = "返回",
		returnIcon,
		buttons,
		closeButtonProps = { size: "small" },
		padding,
		sx = [],
		yOffset = "12px",
		xOffset = "4px",
		...rest
	} = props;

	const iconSize = useMemo(() => {
		return closeButtonProps?.size || "small";
	}, [closeButtonProps?.size]);

	return (
		<DialogTitle
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
				<DialogTitleButtonsBox>{buttons}</DialogTitleButtonsBox>
				{onClose && (
					<Tooltip title={closeText || ""}>
						<IconButton
							// disableRipple
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
});

DialogTitleEx.displayName = "DialogTitleEx";

export default DialogTitleEx;
