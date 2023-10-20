import { useCrud } from "@/contexts/crud/useCrud";
import React, { forwardRef, memo } from "react";
import TypoWebApiOptionsPicker from "./TypoWebApiOptionsPicker";

const TypoWebApiOptionsPickerContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrud();
	return <TypoWebApiOptionsPicker ref={ref} editing={editing} {...rest} />;
});

TypoWebApiOptionsPickerContainer.displayName =
	"TypoWebApiOptionsPickerContainer";

export default TypoWebApiOptionsPickerContainer;
