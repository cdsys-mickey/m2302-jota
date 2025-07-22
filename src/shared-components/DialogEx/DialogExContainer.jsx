import { useContext } from "react";
import DialogExView from "./DialogExView";
import CrudContext from "@/contexts/crud/CrudContext";

const DialogExContainer = (props) => {
	const { ...rest } = props;
	const crud = useContext(CrudContext);
	return (
		<DialogExView
			disableEscapeKeyDown={crud?.editing}
			hideCloseButton={crud?.editing}
			// fullScreen={crud?.editing}
			{...rest}
		/>
	);
};

DialogExContainer.displayName = "DialogExContainer";
export default DialogExContainer;