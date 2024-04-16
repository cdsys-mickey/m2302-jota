import { useCallback } from "react";
import CheckboxComponent from "./CheckboxComponent";

export const CheckboxComponentContainer = (props) => {
	const { ...rest } = props;

	const deleteRow = useCallback(() => {}, []);

	const duplicateRow = useCallback(() => {}, []);

	const getContextMenuItems = useCallback(() => {}, []);

	const insertRowBelow = useCallback(() => {}, []);

	return (
		<CheckboxComponent
			deleteRow={deleteRow}
			duplicateRow={duplicateRow}
			getContextMenuItems={getContextMenuItems}
			insertRowBelow={insertRowBelow}
			{...rest}
		/>
	);
};

CheckboxComponentContainer.displayName = "CheckboxComponentContainer";
