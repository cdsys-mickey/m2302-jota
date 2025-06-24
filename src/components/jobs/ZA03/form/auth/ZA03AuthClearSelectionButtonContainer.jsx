import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { ButtonEx } from "@/shared-components";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useContext } from "react";

export const ZA03AuthClearSelectionButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const formMeta = useContext(FormMetaContext);

	if (!za03.authGridEditing) {
		return false;
	}

	return (
		<ButtonEx
			// startIcon={<RemoveDoneIcon />}
			onClick={za03.clearSelection({ gridMeta: formMeta.gridMeta })}
			{...rest}
		/>
	);
};
ZA03AuthClearSelectionButtonContainer.displayName =
	"ZA03AuthClearSelectionButtonContainer";
