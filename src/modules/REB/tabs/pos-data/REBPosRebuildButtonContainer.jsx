import { ButtonEx } from "@/shared-components";
import RestoreIcon from '@mui/icons-material/Restore';
import { forwardRef, memo, useContext } from "react";
import { useFormContext } from "react-hook-form";
import { REBContext } from "../../REBContext";

const REBPosRebuildButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const reb = useContext(REBContext);
		const form = useFormContext();

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<RestoreIcon />}
				onClick={form.handleSubmit(reb.onPosRebuildSubmit, reb.onPosRebuildSubmitError)}
				loading={reb.posRebuildWorking}
				disabled={reb.loadWorking}
				// color="secondary"
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				重整
			</ButtonEx>
		);
	})
);
REBPosRebuildButtonContainer.displayName = "REBPosRebuildButtonContainer";
export default REBPosRebuildButtonContainer;



