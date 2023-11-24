import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import TypoDateField from "./TypoDateField";

export const TypoDateFieldContainer = React.forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrudZZ();
	return <TypoDateField ref={ref} editing={editing} {...rest} />;
});
