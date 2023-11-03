import React from "react";
import MockA01ListItem from "./MockA01ListItem";
import { useCrud } from "@/contexts/crud/useCrud";

export const MockA01ListItemContainer = React.forwardRef(({ ...rest }, ref) => {
	const { handleViewing, handleEditing } = useCrud();

	return (
		<MockA01ListItem
			ref={ref}
			onClick={handleViewing}
			onEdit={handleEditing}
			{...rest}
		/>
	);
});
