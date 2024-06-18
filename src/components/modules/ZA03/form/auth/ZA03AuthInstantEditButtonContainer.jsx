import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";

export const ZA03AuthInstantEditButtonContainer = () => {
	const za03 = useContext(ZA03Context);

	if (za03.authGridEditing) {
		return false;
	}

	return (
		<ResponsiveButton color="secondary" onClick={za03.goAuthInstantEditing}>
			即時編輯
		</ResponsiveButton>
	);
};

ZA03AuthInstantEditButtonContainer.displayName =
	"ZA03AuthInstantEditButtonContainer";
