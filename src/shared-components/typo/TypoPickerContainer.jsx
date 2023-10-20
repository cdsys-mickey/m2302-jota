import { useCrud } from "@/contexts/crud/useCrud";
import React from "react";
import TypoPicker from "./TypoPicker";

export const TypoPickerContainer = React.forwardRef(({ ...rest }, ref) => {
	const { editing } = useCrud();
	return <TypoPicker ref={ref} editing={editing} {...rest} />;
});
