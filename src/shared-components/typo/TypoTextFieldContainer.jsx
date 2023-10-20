import { useCrud } from "@/contexts/crud/useCrud";
import { forwardRef } from "react";
import TypoTextField from "./TypoTextField";

const TypoTextFieldContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing } = useCrud();
	return <TypoTextField ref={ref} editing={editing} {...rest} />;
});

TypoTextFieldContainer.displayName = "TypoTextFieldContainer";

export default TypoTextFieldContainer;
