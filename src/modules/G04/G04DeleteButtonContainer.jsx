
import ButtonWrapper from "@/shared-components/ButtonWrapper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { forwardRef, memo, useContext } from "react";
import { G04Context } from "./G04Context";
import { useFormContext } from "react-hook-form";

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
			// <Tooltip title={title} arrow>
			// 	<span>
			<ButtonWrapper
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
			</ButtonWrapper>
			// 	</span>
			// </Tooltip>
		);
	})
);
G04DeleteButtonContainer.displayName = "G04DeleteButtonContainer";
export default G04DeleteButtonContainer;


