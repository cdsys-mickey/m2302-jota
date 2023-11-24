import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import TypoCheckboxEx from "./TypoCheckboxEx";

export const TypoCheckboxExContainer = React.forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrudZZ();
	return <TypoCheckboxEx ref={ref} editing={editing} {...rest} />;
});
