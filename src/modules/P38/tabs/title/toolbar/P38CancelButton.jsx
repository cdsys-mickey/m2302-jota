import { ButtonEx } from "@/shared-components";

import { useContext } from "react";
import P38TitleContext from "../P38TitleContext";

const P38CancelButton = (props) => {
	const { ...rest } = props;
	const p38 = useContext(P38TitleContext);

	if (!p38.editing) {
		return false;
	}

	return (
		<ButtonEx
			responsive
			color="warning"
			variant="outlined"
			size="small"
			// endIcon={<SaveIcon />}
			disabled={p38.saveWorking}
			onClick={p38.cancelEdit}
			{...rest}
		>取消</ButtonEx>

	)
}

P38CancelButton.displayName = "P38CancelButton";
export default P38CancelButton;
