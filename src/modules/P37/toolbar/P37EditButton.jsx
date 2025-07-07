import { ButtonEx } from "@/shared-components";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useContext } from "react";
import P37Context from "../P37Context";

const P37EditButton = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);
	const grid = useContext(DSGContext);
	const { setActiveCell } = grid;

	const handleEdit = useCallback(() => {
		grid.handleUnlock();
		setActiveCell({ col: 0, row: 0 })
	}, [grid, setActiveCell]);

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
			onClick={handleEdit}
			{...rest}
		>編輯</ButtonEx>

	)
}

P37EditButton.displayName = "P37EditButton";
export default P37EditButton;