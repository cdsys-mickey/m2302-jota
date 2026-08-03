import { AuthContext } from "@/contexts/auth/AuthContext";
import { F07Context } from "@/contexts/F07/F07Context";
import { ButtonEx } from "@/shared-components";
import RestoreIcon from '@mui/icons-material/Restore';
import { forwardRef, memo, useContext } from "react";

/**
 * 目前沒辦法重整當期，已停用
 */
const F07RestoreButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f07 = useContext(F07Context);
		const auth = useContext(AuthContext);

		if (!auth.operator?.hasRoot) {
			return false;
		}

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<RestoreIcon />}
				onClick={f07.confirmRestore}
				loading={f07.restoreWorking}
				color="warning"
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				當期重整
			</ButtonEx>
		);
	})
);
F07RestoreButtonContainer.displayName = "F07RestoreButtonContainer";
export default F07RestoreButtonContainer;


