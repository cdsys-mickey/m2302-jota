import { ButtonEx } from "@/shared-components";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import UserSettingEditorContext from "../context/UserSettingEditorContext";

const UserSettingEditorSaveButton = (props) => {
	const { ...rest } = props;
	const userSettingEditor = useContext(UserSettingEditorContext);
	const form = useFormContext();

	const handleSubmit = form.handleSubmit(userSettingEditor.onSubmit, userSettingEditor.onSubmitError);

	if (
		userSettingEditor.grid.gridLoading ||
		!userSettingEditor.grid.gridData ||
		userSettingEditor.grid.gridData?.length === 0 ||
		userSettingEditor.grid.readOnly
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
			loading={userSettingEditor.saveWorking}
			onClick={handleSubmit}
			disabled={!userSettingEditor.grid.isDirty}
			{...rest}
		>儲存</ButtonEx>

	)
}

UserSettingEditorSaveButton.displayName = "UserSettingEditorSaveButton";
export default UserSettingEditorSaveButton;
