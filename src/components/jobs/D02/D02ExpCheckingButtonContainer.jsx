import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { forwardRef, memo, useContext, useMemo } from "react";
import { D02Context } from "@/contexts/D02/D02Context";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const D02ExpCheckingButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const d02 = useContext(D02Context);

		return (
			<ButtonGroup variant="contained" color="neutral" size="small">
				<ResponsiveButton
					ref={ref}
					// variant="contained"
					endIcon={<InsertInvitationIcon />}
					onClick={d02.onExpDialogOpen}
					className="no-margin-right"
					sx={{
						fontWeight: 600,
					}}
					{...rest}>
					有效日期檢查
				</ResponsiveButton>
				{d02.expChecking && (
					<Button
						className="no-margin-right"
						color="warning"
						onClick={d02.cancelExpChecking}>
						<ClearIcon fontSize="small" />
					</Button>
				)}
			</ButtonGroup>
		);
	})
);
D02ExpCheckingButtonContainer.displayName = "D02ExpCheckingButtonContainer";
export default D02ExpCheckingButtonContainer;

