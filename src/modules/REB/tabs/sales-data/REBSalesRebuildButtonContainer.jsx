import { ButtonEx } from "@/shared-components";
import RestoreIcon from '@mui/icons-material/Restore';
import { forwardRef, memo, useContext } from "react";
import { REBContext } from "../../REBContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

const REBSalesRebuildButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const reb = useContext(REBContext);
		const form = useFormContext();

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(reb.onSubmit, reb.onSubmitError);
		}, [form, reb.onSubmit, reb.onSubmitError])

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<RestoreIcon />}
				onClick={handleSubmit}
				loading={reb.updateWorking}
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



