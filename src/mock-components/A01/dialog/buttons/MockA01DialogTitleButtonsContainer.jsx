import React from "react";
import MockA01DialogTitleEditButtons from "./MockA01DialogTitleEditButtons";
import MockA01DialogTitleViewButtons from "./MockA01DialogTitleViewButtons";
import { useContext } from "react";

const MockA01DialogTitleButtonsContainer = React.forwardRef((props, ref) => {
	const { ...rest } = props;
	const curd = useContext(CrudContext);

	if (curd.editing) {
		return <MockA01DialogTitleEditButtons ref={ref} {...rest} />;
	}
	return (
		<MockA01DialogTitleViewButtons
			ref={ref}
			onEdit={curd.promptUpdate}
			{...rest}
		/>
	);
});

MockA01DialogTitleButtonsContainer.displayName =
	"MockA01DialogTitleButtonsContainer";

export default MockA01DialogTitleButtonsContainer;
