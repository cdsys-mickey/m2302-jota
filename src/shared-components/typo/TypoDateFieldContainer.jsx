import { forwardRef, useContext } from "react";
import CrudContext from "../../contexts/crud/CrudContext";
import TypoDateField from "./TypoDateField";
import { useWatch } from "react-hook-form";

export const TypoDateFieldContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing } = useContext(CrudContext);

	return <TypoDateField ref={ref} editing={editing} {...rest} />;
});

TypoDateFieldContainer.displayName = "TypoDateFieldContainer";
