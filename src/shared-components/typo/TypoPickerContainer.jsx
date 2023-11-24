import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import TypoPicker from "./TypoPicker";

export const TypoPickerContainer = React.forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrudZZ();
	return <TypoPicker ref={ref} editing={editing} {...rest} />;
});
