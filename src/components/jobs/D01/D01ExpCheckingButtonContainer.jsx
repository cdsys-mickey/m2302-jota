import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { forwardRef, memo, useContext, useMemo } from "react";
import { D01Context } from "@/contexts/D01/D01Context";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const D01ExpCheckingButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const d01 = useContext(D01Context);

		return (
			<ButtonGroup variant="contained" color="neutral" size="small">
				<ResponsiveButton
					ref={ref}
					// variant="contained"
					endIcon={<InsertInvitationIcon />}
					onClick={d01.onExpDialogOpen}
					className="no-margin-right"
					sx={{
						fontWeight: 600,
					}}
					{...rest}>
					有效日期檢查
				</ResponsiveButton>
				{d01.expChecking && (
					<Button
						className="no-margin-right"
						color="warning"
						onClick={d01.cancelExpChecking}>
						<ClearIcon fontSize="small" />
					</Button>
				)}
			</ButtonGroup>
		);
	})
);
D01ExpCheckingButtonContainer.displayName = "D01ExpCheckingButtonContainer";
export default D01ExpCheckingButtonContainer;
