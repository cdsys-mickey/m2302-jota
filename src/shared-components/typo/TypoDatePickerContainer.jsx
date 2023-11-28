import { forwardRef, useContext } from "react";
import CrudContext from "../../contexts/crud/CrudContext";
import TypoDatePicker from "./TypoDatePicker";

export const TypoDatePickerContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoDatePicker ref={ref} editing={editing} {...rest} />;
});

TypoDatePickerContainer.displayName = "TypoDatePickerContainer";
