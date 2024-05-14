import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import C04DialogTitleEditButtons from "./ZZC04DialogTitleEditButtons";
import C04DialogTitleViewButtons from "./ZZC04DialogTitleViewButtons";

export const C04DialogTitleButtonsContainer = React.forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing, handleEditing } = useCrudZZ();

	if (editing) {
		return <C04DialogTitleEditButtons ref={ref} {...rest} />;
	}
	return (
		<C04DialogTitleViewButtons ref={ref} onEdit={handleEditing} {...rest} />
	);
});
