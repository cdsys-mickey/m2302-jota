import { forwardRef, memo } from "react";
import TypoWebApiOptionsPicker from "./TypoWebApiOptionsPicker";
import CrudContext from "../../contexts/crud/CrudContext";
import { useContext } from "react";

const TypoWebApiOptionsPickerContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoWebApiOptionsPicker ref={ref} editing={editing} {...rest} />;
});

TypoWebApiOptionsPickerContainer.displayName =
	"TypoWebApiOptionsPickerContainer";

export default TypoWebApiOptionsPickerContainer;
