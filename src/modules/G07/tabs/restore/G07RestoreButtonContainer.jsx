import { AuthContext } from "@/contexts/auth/AuthContext";
import { ButtonEx } from "@/shared-components";
import RestoreIcon from '@mui/icons-material/Restore';
import { forwardRef, memo, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { G07Context } from "../../G07Context";

const G07RestoreButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g07 = useContext(G07Context);
		const auth = useContext(AuthContext);
		const form = useFormContext();

		if (!auth.impersonate) {
			return false;
		}

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<RestoreIcon />}
				onClick={form.handleSubmit(g07.onRestoreSubmit, g07.onRestoreSubmitError)}
				loading={g07.restoreWorking}
				color="secondary"
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				復原
			</ButtonEx>
		);
	})
);
G07RestoreButtonContainer.displayName = "G07RestoreButtonContainer";
export default G07RestoreButtonContainer;


