import { useContext } from "react";
import DialogEx from "./DialogEx";
import CrudContext from "@/contexts/crud/CrudContext";

export const DialogExContainer = (props) => {
	const { ...rest } = props;
	const crud = useContext(CrudContext);
	return (
		<DialogEx
			disableEscapeKeyDown={crud?.editing}
			hideCloseButton={crud?.editing}
			{...rest}
		/>
	);
};

DialogExContainer.displayName = "DialogExContainer";
