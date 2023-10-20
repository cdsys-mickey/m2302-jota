import { IconButton, styled } from "@mui/material";
import React, { forwardRef } from "react";
import HoverableListItemSecondaryAction from "@/shared-components/HoverableListItemSecondaryAction";
import CloseIcon from "@mui/icons-material/Close";

const MessageItemSecondaryAction = styled(
	forwardRef((props, ref) => {
		const { children, ...other } = props;
		return (
			<HoverableListItemSecondaryAction ref={ref} p={1} {...other}>
				<IconButton edge="end" aria-label="delete" size="small">
					<CloseIcon fontSize="small" />
				</IconButton>
			</HoverableListItemSecondaryAction>
		);
	})
)(({ theme }) => ({}));

export default React.memo(MessageItemSecondaryAction);
