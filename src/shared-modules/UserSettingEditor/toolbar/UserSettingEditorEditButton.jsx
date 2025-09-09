import { ButtonEx } from "@/shared-components";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useContext } from "react";
import UserSettingEditorContext from "../context/UserSettingEditorContext";
import CrudContext from "@/contexts/crud/CrudContext";

const UserSettingEditorEditButton = (props) => {
	const { ...rest } = props;
	const userSettingEditor = useContext(UserSettingEditorContext);
	const grid = useContext(DSGContext);
	const crud = useContext(CrudContext);
	const { setActiveCell } = grid;

	const handleEdit = useCallback(() => {
		grid.handleUnlock();
		crud.promptUpdating();
		setActiveCell({ col: 1, row: 0 })
	}, [crud, grid, setActiveCell]);

	if (
		!userSettingEditor.grid.readOnly
	) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			variant="contained"
			color="primary"
			size="small"
			endIcon={<EditIcon />}
			loading={userSettingEditor.saveWorking}
			onClick={handleEdit}
			{...rest}
		>編輯</ButtonEx>

	)
}

UserSettingEditorEditButton.displayName = "UserSettingEditorEditButton";
export default UserSettingEditorEditButton;
