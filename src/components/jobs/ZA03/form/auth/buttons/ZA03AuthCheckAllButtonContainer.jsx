import { ButtonEx } from "@/shared-components";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03AuthCheckAllButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);

	if (!za03.authGridEditing) {
		return false;
	}
	return (
		<ButtonEx
			startIcon={<DoneAllIcon />}
			onClick={za03.checkAll}
			{...rest}
		/>
	);
};

ZA03AuthCheckAllButtonContainer.displayName = "ZA03AuthCheckAllButtonContainer";
