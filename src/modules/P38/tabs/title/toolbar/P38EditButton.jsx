import { ButtonEx } from "@/shared-components";
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import P38TitleContext from "../P38TitleContext";
import { useCallback } from "react";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";

const P38EditButton = (props) => {
	const { ...rest } = props;
	const p38 = useContext(P38TitleContext);
	const formMeta = useContext(FormMetaContext);

	const handleEdit = useCallback(() => {
		p38.promptUpdating();
		formMeta.handleFocusFirstField();
	}, [formMeta, p38]);

	if (p38.editing) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			variant="contained"
			color="primary"
			size="small"
			endIcon={<EditIcon />}
			loading={p38.saveWorking}
			onClick={handleEdit}
			{...rest}
		>編輯</ButtonEx>

	)
}

P38EditButton.displayName = "P38EditButton";
export default P38EditButton;
