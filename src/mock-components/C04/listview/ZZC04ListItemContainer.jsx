import React from "react";
import C04ListItem from "./C04ListItem";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";

export const C04ListItemContainer = React.forwardRef(({ ...rest }, ref) => {
	const { handleViewing, handleEditing } = useCrudZZ();

	return (
		<C04ListItem
			ref={ref}
			onClick={handleViewing}
			onEdit={handleEditing}
			{...rest}
		/>
	);
});
