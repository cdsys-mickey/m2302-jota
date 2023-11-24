import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import TypoDatePicker from "./TypoDatePicker";

export const TypoDatePickerContainer = React.forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrudZZ();
	return <TypoDatePicker ref={ref} editing={editing} {...rest} />;
});
