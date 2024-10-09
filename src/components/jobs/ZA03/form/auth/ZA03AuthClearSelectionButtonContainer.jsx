import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

export const ZA03AuthClearSelectionButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const formMeta = useContext(FormMetaContext);

	if (!za03.authGridEditing) {
		return false;
	}

	return (
		<ButtonWrapper
			startIcon={<RemoveDoneIcon />}
			onClick={za03.clearSelection({ gridMeta: formMeta.gridMeta })}
			{...rest}
		/>
	);
};
ZA03AuthClearSelectionButtonContainer.displayName =
	"ZA03AuthClearSelectionButtonContainer";
