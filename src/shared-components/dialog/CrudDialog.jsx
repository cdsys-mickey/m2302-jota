import { useContext } from "react";
import DialogEx from "./DialogEx";
import CrudContext from "@/contexts/crud/CrudContext";

const CrudDialog = (props) => {
	const { ...rest } = props;
	const crud = useContext(CrudContext);
	return (
		<DialogEx
			disableEscapeKeyDown={crud?.editing}
			hideCloseButton={crud?.editing}
			// fullScreen={crud?.editing}
			{...rest}
		/>
	);
};

CrudDialog.displayName = "CrudDialog";
export default CrudDialog;