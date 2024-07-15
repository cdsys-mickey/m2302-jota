import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { forwardRef, memo, useContext, useMemo } from "react";
import { D07Context } from "@/contexts/D07/D07Context";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const D07ExpCheckingButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const d07 = useContext(D07Context);

		return (
			<ButtonGroup variant="contained" color="neutral" size="small">
				<ResponsiveButton
					ref={ref}
					// variant="contained"
					endIcon={<InsertInvitationIcon />}
					onClick={d07.onExpDialogOpen}
					className="no-margin-right"
					sx={{
						fontWeight: 600,
					}}
					{...rest}>
					有效日期檢查
				</ResponsiveButton>
				{d07.expChecking && (
					<Button
						className="no-margin-right"
						color="warning"
						onClick={d07.cancelExpChecking}>
						<ClearIcon fontSize="small" />
					</Button>
				)}
			</ButtonGroup>
		);
	})
);
D07ExpCheckingButtonContainer.displayName = "D07ExpCheckingButtonContainer";
export default D07ExpCheckingButtonContainer;



