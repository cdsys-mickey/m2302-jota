import React from "react";
import C04ListItem from "./C04ListItem";
import { useCrud } from "@/contexts/crud/useCrud";

export const C04ListItemContainer = React.forwardRef(({ ...rest }, ref) => {
	const { handleViewing, handleEditing } = useCrud();

	return (
		<C04ListItem
			ref={ref}
			onClick={handleViewing}
			onEdit={handleEditing}
			{...rest}
		/>
	);
});
