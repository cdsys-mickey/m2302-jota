import { forwardRef, useContext } from "react";
import CrudContext from "../../contexts/crud/CrudContext";
import TypoCheckboxEx from "./TypoCheckboxEx";

export const TypoCheckboxExContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoCheckboxEx ref={ref} editing={editing} {...rest} />;
});

TypoCheckboxExContainer.displayName = "TypoCheckboxExContainer";
