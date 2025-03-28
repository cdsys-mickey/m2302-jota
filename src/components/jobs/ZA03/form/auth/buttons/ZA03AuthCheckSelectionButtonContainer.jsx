import ButtonWrapper from "@/shared-components/ButtonWrapper";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import CheckIcon from "@mui/icons-material/Check";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

export const ZA03AuthCheckSelectionButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const formMeta = useContext(FormMetaContext);

	if (!za03.authGridEditing) {
		return false;
	}
	return (
		<ButtonWrapper
			startIcon={<CheckIcon />}
			onClick={za03.checkSelection({ gridMeta: formMeta.gridMeta })}
			{...rest}
		/>
	);
};

ZA03AuthCheckSelectionButtonContainer.displayName =
	"ZA03AuthCheckSelectionButtonContainer";
