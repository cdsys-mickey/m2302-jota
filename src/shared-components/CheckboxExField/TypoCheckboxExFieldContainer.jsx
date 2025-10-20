import { forwardRef, useContext } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import TypoCheckboxExField from "./TypoCheckboxExField";

export const TypoCheckboxExFieldContainer = forwardRef(({ ...rest }, ref) => {
	const { editing } = useContext(CrudContext);
	return <TypoCheckboxExField ref={ref} editing={editing} {...rest} />;
});

TypoCheckboxExFieldContainer.displayName = "TypoCheckboxExFieldContainer";
