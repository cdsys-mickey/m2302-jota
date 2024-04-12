import { forwardRef, useContext } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import TypoTextField from "./TypoTextField";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

const TypoTextFieldContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { editing } = useContext(CrudContext);

	return <TypoTextField ref={ref} editing={editing} {...rest} />;
});

TypoTextFieldContainer.displayName = "TypoTextFieldContainer";
TypoTextFieldContainer.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default TypoTextFieldContainer;
