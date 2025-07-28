import { ButtonEx } from "@/shared-components";

import { useContext } from "react";
import P37XContext from "../P37XContext";

const P37XCancelButton = (props) => {
	const { ...rest } = props;
	const p37x = useContext(P37XContext);

	if (
		p37x.grid.gridLoading ||
		!p37x.grid.gridData ||
		p37x.grid.gridData?.length === 0 ||
		p37x.grid.readOnly ||
		p37x.saveWorking
	) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			color="warning"
			variant="outlined"
			size="small"
			// endIcon={<SaveIcon />}
			loading={p37x.saveWorking}
			onClick={p37x.cancelEdit}
			{...rest}
		>取消</ButtonEx>

	)
}

P37XCancelButton.displayName = "P37XCancelButton";
export default P37XCancelButton;
