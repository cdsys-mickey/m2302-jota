import { forwardRef, memo } from "react";
import TypoOptionPicker from "./TypoOptionPicker";
import CrudContext from "../../contexts/crud/CrudContext";
import { useContext } from "react";

const TypoOptionPickerContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoOptionPicker ref={ref} editing={editing} {...rest} />;
});

TypoOptionPickerContainer.displayName = "TypoOptionPickerContainer";

export default TypoOptionPickerContainer;
