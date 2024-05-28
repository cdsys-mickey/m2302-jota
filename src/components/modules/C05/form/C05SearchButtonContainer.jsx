import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { useContext } from "react";
import { C05Context } from "@/contexts/C05/C05Context";

export const C05SearchButtonContainer = (props) => {
	const { ...rest } = props;
	const c05 = useContext(C05Context);

	return (
		<ButtonWrapper type="submit" loading={c05.listLoading} {...rest}>
			搜尋
		</ButtonWrapper>
	);
};

C05SearchButtonContainer.displayName = "C05SearchButtonContainer";
