import { F02Context } from "@/pages/jobs/F02/F02Context";
import { ButtonEx } from "@/shared-components";
import LockIcon from '@mui/icons-material/Lock';
import { forwardRef, memo, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const F02StageButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const f02 = useContext(F02Context);
		const form = useFormContext();

		const handleStage = useMemo(() => {
			return form.handleSubmit(f02.onSubmit, f02.onSubmitErrort);
		}, [f02.onSubmit, f02.onSubmitErrort, form]);

		const disabled = useMemo(() => {
			return f02.grid.readOnly;
		}, [f02.grid.readOnly])

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<LockIcon />}
				onClick={handleStage}
				disabled={disabled}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				產生電腦帳
			</ButtonEx>
		);
	})
);
F02StageButtonContainer.displayName = "F02StageButtonContainer";
export default F02StageButtonContainer;


