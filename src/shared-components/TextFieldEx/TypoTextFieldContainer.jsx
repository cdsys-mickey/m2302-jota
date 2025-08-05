
import CrudContext from "@/contexts/crud/CrudContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import TypoTextField from "./TypoTextField";
import { useMemo } from "react";

const TypoTextFieldContainer = forwardRef((props, ref) => {
	const { editing, ...rest } = props;
	const { editing: _editing } = useContext(CrudContext);
	const __editing = useMemo(() => {
		return editing != null ? editing : _editing;
	}, [_editing, editing])

	return <TypoTextField ref={ref} editing={__editing}  {...rest} />;
});

TypoTextFieldContainer.displayName = "TypoTextFieldContainer";
TypoTextFieldContainer.propTypes = {
	editing: PropTypes.bool,
};

export default TypoTextFieldContainer;
