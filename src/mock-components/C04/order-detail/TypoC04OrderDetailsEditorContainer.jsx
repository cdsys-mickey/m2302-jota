import { useCrud } from "@/contexts/crud/useCrud";
import React from "react";
import TypoC04TransferEditor from "./TypoC04OrderDetailsEditor";

export const TypoC04OrderDetailsEditorContainer = React.forwardRef(
	(props, ref) => {
		const { ...rest } = props;
		const { editing } = useCrud();
		return <TypoC04TransferEditor ref={ref} editing={editing} {...rest} />;
	}
);
