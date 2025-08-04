import { forwardRef, useContext } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import TypoDatePicker from "./TypoDatePicker";
import { useMemo } from "react";
import PropTypes from "prop-types";

export const TypoDatePickerContainer = forwardRef((props, ref) => {
	const { editing, ...rest } = props;
	const { editing: _editing } = useContext(CrudContext);

	const __editing = useMemo(() => {
		return editing != null ? editing : _editing;
	}, [_editing, editing])

	return <TypoDatePicker ref={ref} editing={__editing} {...rest} />;
});
TypoDatePickerContainer.propTypes = {
	editing: PropTypes.bool,
}
TypoDatePickerContainer.displayName = "TypoDatePickerContainer";
