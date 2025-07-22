import { useContext } from "react";
import DialogExView from "./DialogExView";
import CrudContext from "@/contexts/crud/CrudContext";

const CrudDialog = (props) => {
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

CrudDialog.displayName = "CrudDialog";
export default CrudDialog;