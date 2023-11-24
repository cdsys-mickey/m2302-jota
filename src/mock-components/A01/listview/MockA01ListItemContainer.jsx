import React from "react";
import MockA01ListItem from "./MockA01ListItem";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";

export const MockA01ListItemContainer = React.forwardRef(({ ...rest }, ref) => {
	const { handleViewing, handleEditing } = useCrudZZ();

	return (
		<MockA01ListItem
			ref={ref}
			onClick={handleViewing}
			onEdit={handleEditing}
			{...rest}
		/>
	);
});
