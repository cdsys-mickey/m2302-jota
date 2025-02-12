import { useContext } from "react";
import { StdPrintContext } from "../../contexts/std-print/StdPrintContext";
import StdFields from "./StdFields";
import StdPrint from "../../modules/md-std-print";

export const StdPrintUnusedFieldsContainer = (props) => {
	const stdPrint = useContext(StdPrintContext);
	const { ...rest } = props;
	return (
		<StdFields
			fields={stdPrint.fields}
			droppableId={StdPrint.UNUSED}
			loading={stdPrint.fieldsLoading}
			onDelete={stdPrint.handleAdd}
			{...rest}
		/>
	);
};

StdPrintUnusedFieldsContainer.displayName = "StdPrintUnusedFieldsContainer";
