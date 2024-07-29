import { useContext } from "react";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";
import TextComponentEx from "./TextComponentEx";

export const TextComponentExContainer = (props) => {
	const { ...rest } = props;
	const dsg = useContext(DsgContext);
	return (
		<TextComponentEx
			skipDisabled={dsg.skipDisabled}
			nextCell={dsg.nextCell}
			{...rest}
		/>
	);
};

TextComponentExContainer.displayName = "TextComponentExContainer";
