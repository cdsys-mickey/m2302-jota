import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React, { forwardRef, memo } from "react";
import TypoWebApiOptionsPicker from "./TypoWebApiOptionsPicker";

const TypoWebApiOptionsPickerContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrudZZ();
	return <TypoWebApiOptionsPicker ref={ref} editing={editing} {...rest} />;
});

TypoWebApiOptionsPickerContainer.displayName =
	"TypoWebApiOptionsPickerContainer";

export default TypoWebApiOptionsPickerContainer;
