import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import CheckIcon from "@mui/icons-material/Check";

export const ZA03AuthCheckSelectionButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);

	if (!za03.authGridEditing) {
		return false;
	}
	return (
		<ButtonWrapper
			startIcon={<CheckIcon />}
			onClick={za03.checkSelection}
			{...rest}
		/>
	);
};

ZA03AuthCheckSelectionButtonContainer.displayName =
	"ZA03AuthCheckSelectionButtonContainer";
