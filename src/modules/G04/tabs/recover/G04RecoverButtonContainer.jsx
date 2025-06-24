
import { ButtonEx } from "@/shared-components";
import RestoreIcon from '@mui/icons-material/Restore';
import { useMemo } from "react";
import { forwardRef, memo, useContext } from "react";
import { G04Context } from "@/modules/G04/G04Context";
import { useFormContext } from "react-hook-form";

const G04RecoverButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g04 = useContext(G04Context);
		const form = useFormContext();

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(g04.onRecoverSubmit, g04.onRecoverSubmitError);
		}, [form, g04.onRecoverSubmit, g04.onRecoverSubmitError])


		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<RestoreIcon />}
				color="secondary"
				onClick={handleSubmit}
				// disabled={disabled}
				sx={{
					fontWeight: 600,
				}}
				loading={g04.restoreWorking}
				{...rest}>
				復原
			</ButtonEx>
		);
	})
);
G04RecoverButtonContainer.displayName = "G04RecoverButtonContainer";
export default G04RecoverButtonContainer;


