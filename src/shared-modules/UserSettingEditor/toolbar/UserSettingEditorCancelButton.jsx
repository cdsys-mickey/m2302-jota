import { ButtonEx } from "@/shared-components";

import { useContext } from "react";
import UserSettingEditorContext from "../context/UserSettingEditorContext";

const UserSettingEditorButton = (props) => {
	const { ...rest } = props;
	const userSettingEditor = useContext(UserSettingEditorContext);

	if (
		userSettingEditor.grid.gridLoading ||
		!userSettingEditor.grid.gridData ||
		userSettingEditor.grid.gridData?.length === 0 ||
		userSettingEditor.grid.readOnly ||
		userSettingEditor.saveWorking
	) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			color="warning"
			variant="outlined"
			size="small"
			loading={userSettingEditor.saveWorking}
			onClick={userSettingEditor.cancelEdit}
			{...rest}
		>取消</ButtonEx>

	)
}

UserSettingEditorButton.displayName = "UserSettingEditorButton";
export default UserSettingEditorButton;
