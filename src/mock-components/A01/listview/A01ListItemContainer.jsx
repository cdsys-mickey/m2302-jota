import React from "react";
import A01ListItem from "./A01ListItem";
import { useCrud } from "@/contexts/crud/useCrud";

export const A01ListItemContainer = React.forwardRef(({ ...rest }, ref) => {
	const { handleViewing, handleEditing } = useCrud();

	return (
		<A01ListItem
			ref={ref}
			onClick={handleViewing}
			onEdit={handleEditing}
			{...rest}
		/>
	);
});
