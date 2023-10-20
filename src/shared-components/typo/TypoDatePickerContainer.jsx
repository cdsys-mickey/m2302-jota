import { useCrud } from "@/contexts/crud/useCrud";
import React from "react";
import TypoDatePicker from "./TypoDatePicker";

export const TypoDatePickerContainer = React.forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrud();
	return <TypoDatePicker ref={ref} editing={editing} {...rest} />;
});
