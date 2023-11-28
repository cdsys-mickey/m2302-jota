import { forwardRef, useContext } from "react";
import CrudContext from "../../contexts/crud/CrudContext";
import TypoPicker from "./TypoPicker";

export const TypoPickerContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoPicker ref={ref} editing={editing} {...rest} />;
});

TypoPickerContainer.displayName = "TypoPickerContainer";
