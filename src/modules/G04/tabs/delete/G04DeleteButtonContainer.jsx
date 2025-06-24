
import { ButtonEx } from "@/shared-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { forwardRef, memo, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { G04Context } from "@/modules/G04/G04Context";

const G04DeleteButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g04 = useContext(G04Context);
		const form = useFormContext();

		const handleSubmit = useMemo(() => {
			return form.handleSubmit(g04.onDeleteSubmit, g04.onDeleteSubmitError);
		}, [form, g04.onDeleteSubmit, g04.onDeleteSubmitError])

		// const title = useMemo(() => {
		// 	return g04.staging ? "" : "目前未形成電腦帳";
		// }, [g04.staging])

		return (
			<ButtonEx
				responsive
				ref={ref}
				variant="contained"
				startIcon={<DeleteIcon />}
				color="secondary"
				onClick={handleSubmit}
				// disabled={disabled}
				sx={{
					fontWeight: 600,
				}}
				loading={g04.deleteWorking}
				{...rest}>
				刪除
			</ButtonEx>
		);
	})
);
G04DeleteButtonContainer.displayName = "G04DeleteButtonContainer";
export default G04DeleteButtonContainer;


