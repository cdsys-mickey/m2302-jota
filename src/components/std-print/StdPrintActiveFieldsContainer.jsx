import { useContext } from "react";
import StdFields from "./StdFields";
import { StdPrintContext } from "../../contexts/std-print/StdPrintContext";
import StdPrint from "../../modules/StdPrint.mjs";

export const StdPrintActiveFieldsContainer = (props) => {
	const { ...rest } = props;
	const stdPrint = useContext(StdPrintContext);
	return (
		<StdFields
			fields={stdPrint.selectedFields}
			droppableId={StdPrint.SELECTED}
			loading={stdPrint.fieldsLoading}
			onDelete={stdPrint.handleDelete}
			{...rest}
		/>
	);
};

StdPrintActiveFieldsContainer.displayName = "StdPrintActiveFieldsContainer";
