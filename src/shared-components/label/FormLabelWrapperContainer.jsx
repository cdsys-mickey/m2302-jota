import { useContext } from "react";
import { FormLabelWrapper } from "./FormLabelWrapper";
import CrudContext from "@/contexts/crud/CrudContext";

export const FormLabelWrapperContainer = (props) => {
	const { ...rest } = props;
	const crud = useContext(CrudContext);
	if (crud.editing) {
		return false;
	}
	return <FormLabelWrapper {...rest} />
}

FormLabelWrapperContainer.displayName = "FormLabelWrapperContainer";