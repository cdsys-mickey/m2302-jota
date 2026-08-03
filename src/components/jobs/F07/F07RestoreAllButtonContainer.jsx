import { AuthContext } from "@/contexts/auth/AuthContext";
import { F07Context } from "@/contexts/F07/F07Context";
import { ButtonEx } from "@/shared-components";
import RestoreIcon from '@mui/icons-material/Restore';
import { forwardRef, memo, useContext } from "react";

const F07RestoreAllButtonContainer = memo(
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
				onClick={() => f07.confirmRestore(1)}
				loading={f07.restoreWorking}
				color="secondary"
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				重整庫存
			</ButtonEx>
		);
	})
);
F07RestoreAllButtonContainer.displayName = "F07RestoreAllButtonContainer";
export default F07RestoreAllButtonContainer;


