import ButtonWrapper from "@/shared-components/ButtonWrapper";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { G04Context } from "./G04Context";

const G04CreateBatchButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g04 = useContext(G04Context);
		const form = useFormContext();

		const handleStage = useMemo(() => {
			return form.handleSubmit(g04.onSubmit, g04.onSubmitErrort);
		}, [g04.onSubmit, g04.onSubmitErrort, form]);

		return (
			<ButtonWrapper
				responsive
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={handleStage}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				形成批次
			</ButtonWrapper>
		);
	})
);
G04CreateBatchButtonContainer.displayName = "G04CreateBatchButtonContainer";
export default G04CreateBatchButtonContainer;


