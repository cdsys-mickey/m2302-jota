import { ButtonEx } from "@/shared-components";
import { useContext } from "react";
import { C07Context } from "@/contexts/C07/C07Context";

export const C07SearchButtonContainer = (props) => {
	const { ...rest } = props;
	const c07 = useContext(C07Context);

	return (
		<ButtonEx type="submit" loading={c07.listLoading} {...rest}>
			搜尋
		</ButtonEx>
	);
};

C07SearchButtonContainer.displayName = "C07SearchButtonContainer";
