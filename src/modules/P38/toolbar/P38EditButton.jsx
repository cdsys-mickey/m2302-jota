import { ButtonEx } from "@/shared-components";
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import P38Context from "../P38Context";

const P38EditButton = (props) => {
	const { ...rest } = props;
	const p38 = useContext(P38Context);

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
			onClick={p38.handleEdit}
			{...rest}
		>編輯</ButtonEx>

	)
}

P38EditButton.displayName = "P38EditButton";
export default P38EditButton;
