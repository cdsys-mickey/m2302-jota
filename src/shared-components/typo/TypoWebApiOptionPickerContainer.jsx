import { forwardRef } from "react";
import TypoWebApiOptionPicker from "./TypoWebApiOptionPicker";
import CrudContext from "../../contexts/crud/CrudContext";
import { useContext } from "react";

export const TypoWebApiOptionPickerContainer = forwardRef(
	({ ...rest }, ref) => {
		const { editing } = useContext(CrudContext);
		return <TypoWebApiOptionPicker ref={ref} editing={editing} {...rest} />;
	}
);

TypoWebApiOptionPickerContainer.displayName = "TypoWebApiOptionPickerContainer";
