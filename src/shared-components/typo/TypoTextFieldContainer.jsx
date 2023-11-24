import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import { forwardRef } from "react";
import TypoTextField from "./TypoTextField";

const TypoTextFieldContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing } = useCrudZZ();
	return <TypoTextField ref={ref} editing={editing} {...rest} />;
});

TypoTextFieldContainer.displayName = "TypoTextFieldContainer";

export default TypoTextFieldContainer;
