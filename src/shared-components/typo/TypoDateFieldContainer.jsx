import { useCrud } from "@/contexts/crud/useCrud";
import React from "react";
import TypoDateField from "./TypoDateField";

export const TypoDateFieldContainer = React.forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrud();
	return <TypoDateField ref={ref} editing={editing} {...rest} />;
});
