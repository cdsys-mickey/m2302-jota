import { ButtonWrapper } from "@/shared-components/button/ButtonWrapper";
import { useContext } from "react";
import { B06Context } from "../../../../contexts/B06/B06Context";
import { useFormContext } from "react-hook-form";

export const B06SearchButtonContainer = (props) => {
	const { ...rest } = props;
	const b06 = useContext(B06Context);
	const { handleSubmit } = useFormContext();

	return (
		<ButtonWrapper type="submit" loading={b06.loading} {...rest}>
			搜尋
		</ButtonWrapper>
	);
};

B06SearchButtonContainer.displayName = "B06SearchButtonContainer";
