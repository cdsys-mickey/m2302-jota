import { ButtonEx } from "@/shared-components";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { G04Context } from "@/modules/G04/G04Context";

const G04CreateBatchButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g04 = useContext(G04Context);
		const form = useFormContext();

		const handleStage = useMemo(() => {
			return form.handleSubmit(g04.onSubmit, g04.onSubmitErrort);
		}, [g04.onSubmit, g04.onSubmitErrort, form]);

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={handleStage}
				sx={{
					fontWeight: 600,
				}}
				loading={g04.createWorking}
				{...rest}>
				形成批次
			</ButtonEx>
		);
	})
);
G04CreateBatchButtonContainer.displayName = "G04CreateBatchButtonContainer";
export default G04CreateBatchButtonContainer;


