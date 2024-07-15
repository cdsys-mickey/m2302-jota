import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { forwardRef, memo, useContext, useMemo } from "react";
import { D041Context } from "@/contexts/D041/D041Context";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const D041ExpCheckingButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const d041 = useContext(D041Context);

		return (
			<ButtonGroup variant="contained" color="neutral" size="small">
				<ResponsiveButton
					ref={ref}
					// variant="contained"
					endIcon={<InsertInvitationIcon />}
					onClick={d041.onExpDialogOpen}
					className="no-margin-right"
					sx={{
						fontWeight: 600,
					}}
					{...rest}>
					有效日期檢查
				</ResponsiveButton>
				{d041.expChecking && (
					<Button
						className="no-margin-right"
						color="warning"
						onClick={d041.cancelExpChecking}>
						<ClearIcon fontSize="small" />
					</Button>
				)}
			</ButtonGroup>
		);
	})
);
D041ExpCheckingButtonContainer.displayName = "D041ExpCheckingButtonContainer";
export default D041ExpCheckingButtonContainer;


