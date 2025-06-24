import { ButtonEx } from "@/shared-components";
import { useContext } from "react";
import { B06Context } from "@/contexts/B06/B06Context";

export const B06SearchButtonContainer = (props) => {
	const { ...rest } = props;
	const b06 = useContext(B06Context);

	return (
		<ButtonEx type="submit" loading={b06.listLoading} {...rest}>
			搜尋
		</ButtonEx>
	);
};

B06SearchButtonContainer.displayName = "B06SearchButtonContainer";
