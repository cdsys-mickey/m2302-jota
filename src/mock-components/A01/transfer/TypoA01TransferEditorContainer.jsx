import { useCrud } from "@/contexts/crud/useCrud";
import React from "react";
import TypoA01TransferEditor from "./TypoA01TransferEditor";
import { forwardRef } from "react";

const TypoA01TransferEditorContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing } = useCrud();
	return <TypoA01TransferEditor ref={ref} editing={editing} {...rest} />;
});

TypoA01TransferEditorContainer.displayName = "TypoA01TransferEditorContainer";
export default TypoA01TransferEditorContainer;
