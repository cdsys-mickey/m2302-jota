import { ButtonEx } from "@/shared-components";
import RestoreIcon from '@mui/icons-material/Restore';
import { forwardRef, memo } from "react";
import { useFormContext } from "react-hook-form";
// import { useREB } from "../../useREB";
import { useRebInitQty } from "./contexts/useRebInitQty";

const REBInitQtyRebuildButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		// const reb = useREB();
		const rebInitQty = useRebInitQty();
		const form = useFormContext();

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<RestoreIcon />}
				onClick={form.handleSubmit(rebInitQty.onSubmit, rebInitQty.onSubmitError)}
				loading={rebInitQty.updateWorking}
				// disabled={reb.loadWorking}
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
REBInitQtyRebuildButtonContainer.displayName = "REBInitQtyRebuildButtonContainer";
export default REBInitQtyRebuildButtonContainer;



