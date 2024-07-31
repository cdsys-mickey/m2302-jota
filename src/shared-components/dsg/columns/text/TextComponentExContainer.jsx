import { useContext } from "react";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";
import TextComponentEx from "./TextComponentEx";

export const TextComponentExContainer = (props) => {
	const { ...rest } = props;
	const { skipDisabled, nextCell } = useContext(DsgContext) || {};
	return (
		<TextComponentEx
			skipDisabled={skipDisabled}
			nextCell={nextCell}
			{...rest}
		/>
	);
};

TextComponentExContainer.displayName = "TextComponentExContainer";
