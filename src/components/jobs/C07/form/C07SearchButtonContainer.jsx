import ButtonWrapper from "@/shared-components/ButtonWrapper";
import { useContext } from "react";
import { C07Context } from "@/contexts/C07/C07Context";

export const C07SearchButtonContainer = (props) => {
	const { ...rest } = props;
	const c07 = useContext(C07Context);

	return (
		<ButtonWrapper type="submit" loading={c07.listLoading} {...rest}>
			搜尋
		</ButtonWrapper>
	);
};

C07SearchButtonContainer.displayName = "C07SearchButtonContainer";
