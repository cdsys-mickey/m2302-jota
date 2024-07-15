import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C04Context } from "@/contexts/C04/C04Context";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const C04ExpCheckingButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c04 = useContext(C04Context);

		return (
			<ButtonGroup variant="contained" color="neutral" size="small">
				<ResponsiveButton
					ref={ref}
					// variant="contained"
					endIcon={<InsertInvitationIcon />}
					onClick={c04.onExpDialogOpen}
					className="no-margin-right"
					sx={{
						fontWeight: 600,
					}}
					{...rest}>
					有效日期檢查
				</ResponsiveButton>
				{c04.expChecking && (
					<Button
						className="no-margin-right"
						color="warning"
						onClick={c04.cancelExpChecking}>
						<ClearIcon fontSize="small" />
					</Button>
				)}
			</ButtonGroup>
		);
	})
);
C04ExpCheckingButtonContainer.displayName = "C04ExpCheckingButtonContainer";
export default C04ExpCheckingButtonContainer;
