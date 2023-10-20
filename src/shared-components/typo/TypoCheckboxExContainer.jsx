import { useCrud } from "@/contexts/crud/useCrud";
import React from "react";
import TypoCheckboxEx from "./TypoCheckboxEx";

export const TypoCheckboxExContainer = React.forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrud();
	return <TypoCheckboxEx ref={ref} editing={editing} {...rest} />;
});
