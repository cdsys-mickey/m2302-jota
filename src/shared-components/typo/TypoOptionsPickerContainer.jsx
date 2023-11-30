import { forwardRef, memo } from "react";
import TypoOptionsPicker from "./TypoOptionsPicker";
import CrudContext from "../../contexts/crud/CrudContext";
import { useContext } from "react";

const TypoOptionsPickerContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoOptionsPicker ref={ref} editing={editing} {...rest} />;
});

TypoOptionsPickerContainer.displayName = "TypoOptionsPickerContainer";

export default TypoOptionsPickerContainer;
