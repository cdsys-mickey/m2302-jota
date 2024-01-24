import { forwardRef, useContext } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import TypoTextField from "./TypoTextField";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

const TypoTextFieldContainer = forwardRef((props, ref) => {
	const { name, children, ...rest } = props;
	const { editing } = useContext(CrudContext);

	const value = useWatch({
		name,
	});

	return (
		<TypoTextField name={name} ref={ref} editing={editing} {...rest}>
			{children || value}
		</TypoTextField>
	);
});

TypoTextFieldContainer.displayName = "TypoTextFieldContainer";
TypoTextFieldContainer.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default TypoTextFieldContainer;
