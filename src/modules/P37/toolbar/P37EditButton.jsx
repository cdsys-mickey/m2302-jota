import { ButtonEx } from "@/shared-components";
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import P37Context from "../P37Context";

const P37EditButton = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);

	if (
		!p37.grid.readOnly
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
			loading={p37.saveWorking}
			onClick={p37.handleEdit}
			{...rest}
		>編輯</ButtonEx>

	)
}

P37EditButton.displayName = "P37EditButton";
export default P37EditButton;