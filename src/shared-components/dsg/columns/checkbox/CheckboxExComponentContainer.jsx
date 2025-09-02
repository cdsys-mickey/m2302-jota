import { useCallback } from "react";
import CheckboxCellComponent from "./CheckboxCell/CheckboxCellComponent";

export const CheckboxExComponentContainer = (props) => {
	const { ...rest } = props;

	const deleteRow = useCallback(() => { }, []);

	const duplicateRow = useCallback(() => { }, []);

	const getContextMenuItems = useCallback(() => { }, []);

	const insertRowBelow = useCallback(() => { }, []);

	return (
		<CheckboxExComponent
			deleteRow={deleteRow}
			duplicateRow={duplicateRow}
			getContextMenuItems={getContextMenuItems}
			insertRowBelow={insertRowBelow}
			{...rest}
		/>
	);
};

CheckboxExComponentContainer.displayName = "CheckboxExComponentContainer";
