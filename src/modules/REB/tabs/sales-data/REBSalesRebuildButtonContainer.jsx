import { ButtonEx } from "@/shared-components";
import RestoreIcon from '@mui/icons-material/Restore';
import { forwardRef, memo, useContext } from "react";
import { REBContext } from "../../REBContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useREB } from "../../useREB";
import { useRebSales } from "./contexts/useRebSales";

const REBSalesRebuildButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const rebSales = useRebSales();
		const reb = useREB();
		const form = useFormContext();

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(rebSales.onSubmit, rebSales.onSubmitError);
		}, [form, rebSales.onSubmit, rebSales.onSubmitError])

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<RestoreIcon />}
				onClick={handleSubmit}
				loading={rebSales.updateWorking}
				disabled={reb.loadWorking}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				重整
			</ButtonEx>
		);
	})
);
REBSalesRebuildButtonContainer.displayName = "REBSalesRebuildButtonContainer";
export default REBSalesRebuildButtonContainer;



