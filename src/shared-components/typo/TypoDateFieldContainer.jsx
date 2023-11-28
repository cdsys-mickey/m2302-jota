import { forwardRef, useContext } from "react";
import CrudContext from "../../contexts/crud/CrudContext";
import TypoDateField from "./TypoDateField";

export const TypoDateFieldContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoDateField ref={ref} editing={editing} {...rest} />;
});

TypoDateFieldContainer.displayName = "TypoDateFieldContainer";
