import { forwardRef, useContext } from "react";
import CrudContext from "../../../../../contexts/crud/CrudContext";
import A01DialogTitleEditButtons from "./A01DialogTitleEditButtons";
import A01DialogTitleViewButtons from "./A01DialogTitleViewButtons";
import ActionState from "../../../../../shared-constants/action-state";
import { Skeleton } from "@mui/material";

export const A01DialogTitleButtonsContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const crud = useContext(CrudContext);

	if (crud.editing) {
		return <A01DialogTitleEditButtons ref={ref} {...rest} />;
	}

	if (crud.readState !== ActionState.DONE) {
		return false;
	}

	return (
		<A01DialogTitleViewButtons
			ref={ref}
			onEdit={crud.promptUpdate}
			{...rest}
		/>
	);
});

A01DialogTitleButtonsContainer.displayName = "A01DialogTitleButtonsContainer";
