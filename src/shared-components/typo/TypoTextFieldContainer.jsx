import { forwardRef, useContext } from "react";
import CrudContext from "../../contexts/crud/CrudContext";
import TypoTextField from "./TypoTextField";

const TypoTextFieldContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing } = useContext(CrudContext);
	return <TypoTextField ref={ref} editing={editing} {...rest} />;
});

TypoTextFieldContainer.displayName = "TypoTextFieldContainer";

export default TypoTextFieldContainer;
