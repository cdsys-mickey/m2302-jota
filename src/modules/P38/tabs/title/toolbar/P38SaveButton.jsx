import { ButtonEx } from "@/shared-components";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import P38TitleContext from "../P38TitleContext";
import { useFormContext } from "react-hook-form";

const P38SaveButton = (props) => {
	const { ...rest } = props;
	const p38 = useContext(P38TitleContext);
	const form = useFormContext();

	const handleSubmit = form.handleSubmit(p38.onSubmit, p38.onSubmitError);

	if (!p38.editing) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			variant="contained"
			color="warning"
			size="small"
			endIcon={<SaveIcon />}
			loading={p38.saveWorking}
			onClick={handleSubmit}
			// disabled={!p38.grid.isDirty}
			{...rest}
		>儲存</ButtonEx>

	)
}

P38SaveButton.displayName = "P38SaveButton";
export default P38SaveButton;
