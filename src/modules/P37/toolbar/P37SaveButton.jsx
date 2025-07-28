import { ButtonEx } from "@/shared-components";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import P37Context from "../P37Context";
import { useFormContext } from "react-hook-form";

const P37SaveButton = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);
	const form = useFormContext();

	const handleSubmit = form.handleSubmit(p37.onSubmit, p37.onSubmitError);

	if (!p37.editing) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			variant="contained"
			color="warning"
			size="small"
			endIcon={<SaveIcon />}
			loading={p37.editWorking}
			onClick={handleSubmit}
			{...rest}
		>儲存</ButtonEx>

	)
}

P37SaveButton.displayName = "P37SaveButton";
export default P37SaveButton;