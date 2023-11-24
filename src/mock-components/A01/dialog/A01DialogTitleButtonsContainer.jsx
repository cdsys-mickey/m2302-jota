import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import React from "react";
import A01DialogTitleEditButtons from "./A01DialogTitleEditButtons";
import A01DialogTitleViewButtons from "./A01DialogTitleViewButtons";

const A01DialogTitleButtonsContainer = React.forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing, handleEditing } = useCrudZZ();

	if (editing) {
		return <A01DialogTitleEditButtons ref={ref} {...rest} />;
	}
	return (
		<A01DialogTitleViewButtons ref={ref} onEdit={handleEditing} {...rest} />
	);
});

A01DialogTitleButtonsContainer.displayName = "A01DialogTitleButtonsContainer";

export default A01DialogTitleButtonsContainer;
