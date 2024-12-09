import { forwardRef, useContext } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import TypoTimePicker from "./TypoTimePicker";

export const TypoTimePickerContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoTimePicker ref={ref} editing={editing} {...rest} />;
});

TypoTimePickerContainer.displayName = "TypoTimePickerContainer";
