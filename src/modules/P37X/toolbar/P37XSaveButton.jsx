import { ButtonEx } from "@/shared-components";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import P37XContext from "../P37XContext";
import { useFormContext } from "react-hook-form";

const P37XSaveButton = (props) => {
	const { ...rest } = props;
	const p37x = useContext(P37XContext);
	const form = useFormContext();

	const handleSubmit = form.handleSubmit(p37x.onSubmit, p37x.onSubmitError);

	if (
		p37x.grid.gridLoading ||
		!p37x.grid.gridData ||
		p37x.grid.gridData?.length === 0 ||
		p37x.grid.readOnly
	) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			variant="contained"
			color="warning"
			size="small"
			endIcon={<SaveIcon />}
			loading={p37x.saveWorking}
			onClick={handleSubmit}
			disabled={!p37x.grid.isDirty}
			{...rest}
		>儲存</ButtonEx>

	)
}

P37XSaveButton.displayName = "P37XSaveButton";
export default P37XSaveButton;
