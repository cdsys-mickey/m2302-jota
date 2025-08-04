import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import FormFieldLabelView from "./FormFieldLabelView";
import { useMemo } from "react";
import Types from "@/shared-modules/Types.mjs";
import CrudContext from "@/contexts/crud/CrudContext";
import { useContext } from "react";

const FormFieldLabelContainer = (props) => {
	const { name, children, ...rest } = props;
	const { loadWorking, readWorking } = useContext(CrudContext) || {};

	const _loading = useMemo(() => {
		return loadWorking || readWorking;
	}, [loadWorking, readWorking])

	const value = useWatch({
		name,
	});

	const isNegative = useMemo(() => {
		const _value = Types.isNumber(value) ? value : Number(value);
		const _children = Types.isNumber(children) ? children : Number(children);
		return (_value < 0) || (_children < 0)
	}, [children, value])

	return (
		<FormFieldLabelView
			value={value}
			// isEmpty={isEmpty}
			isNegative={isNegative}
			loading={_loading}
			// loading={true}
			{...rest} >
			{children}
		</FormFieldLabelView>
	)
};

FormFieldLabelContainer.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	stringify: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
};

FormFieldLabelContainer.displayName = "FormFieldLabelContainer";
export default FormFieldLabelContainer;