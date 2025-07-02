import React from "react";
import MockA01ListItem from "./MockA01ListItem";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import { forwardRef } from "react";
import { useContext } from "react";

export const MockA01ListItemContainer = forwardRef(({ ...rest }, ref) => {
	const { handleViewing, handleEditing } = useContext(CrudContext);

	return (
		<MockA01ListItem
			ref={ref}
			onClick={crud.finishedReading}
			onEdit={handleEditing}
			{...rest}
		/>
	);
});
