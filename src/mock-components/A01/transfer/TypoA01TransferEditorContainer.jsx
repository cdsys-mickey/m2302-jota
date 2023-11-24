import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import TypoA01TransferEditor from "./TypoA01TransferEditor";
import { forwardRef } from "react";

const TypoA01TransferEditorContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing } = useCrudZZ();
	return <TypoA01TransferEditor ref={ref} editing={editing} {...rest} />;
});

TypoA01TransferEditorContainer.displayName = "TypoA01TransferEditorContainer";
export default TypoA01TransferEditorContainer;
