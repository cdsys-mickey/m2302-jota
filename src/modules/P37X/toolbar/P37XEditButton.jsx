import { ButtonEx } from "@/shared-components";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useContext } from "react";
import P37XContext from "../P37XContext";

const P37XEditButton = (props) => {
	const { ...rest } = props;
	const p37x = useContext(P37XContext);
	const grid = useContext(DSGContext);
	const { setActiveCell } = grid;

	const handleEdit = useCallback(() => {
		grid.handleUnlock();
		setActiveCell({ col: 0, row: 0 })
	}, [grid, setActiveCell]);

	if (
		!p37x.grid.readOnly
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
			loading={p37x.saveWorking}
			onClick={handleEdit}
			{...rest}
		>編輯</ButtonEx>

	)
}

P37XEditButton.displayName = "P37XEditButton";
export default P37XEditButton;
