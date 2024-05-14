import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { forwardRef, memo, useContext, useMemo } from "react";
import { C04Context } from "@/contexts/C04/C04Context";

const C04ExpCheckingButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const c04 = useContext(C04Context);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				endIcon={<InsertInvitationIcon />}
				onClick={c04.onExpDialogOpen}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				有效日期檢查
			</ResponsiveButton>
		);
	})
);
C04ExpCheckingButtonContainer.displayName = "C04ExpCheckingButtonContainer";
export default C04ExpCheckingButtonContainer;
