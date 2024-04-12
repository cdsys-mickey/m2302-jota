import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import Users from "@/modules/md-users";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useCallback, useContext } from "react";

export const ZA03AuthBatchEditButtonContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);

	if (za03.authEditing) {
		return false;
	}

	return (
		<ResponsiveButton onClick={za03.goAuthBatchEditing} {...rest}>
			批次編輯
		</ResponsiveButton>
	);
};

ZA03AuthBatchEditButtonContainer.displayName =
	"ZA03AuthBatchEditButtonContainer";
