import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import TypoC04TransferEditor from "./TypoC04OrderDetailsEditor";

export const TypoC04OrderDetailsEditorContainer = React.forwardRef(
	(props, ref) => {
		const { ...rest } = props;
		const { editing } = useCrudZZ();
		return <TypoC04TransferEditor ref={ref} editing={editing} {...rest} />;
	}
);
