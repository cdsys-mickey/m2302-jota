import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";
import Types from "@/shared-modules/Types.mjs";
import TypoLabelView from "./TypoLabelView";

const TypoLabelContainer = (props) => {
	const { name, children, ...rest } = props;

	const value = useWatch({
		name,
	});

	const isNegative = useMemo(() => {
		const _value = Types.isNumber(value) ? value : Number(value);
		const _children = Types.isNumber(children) ? children : Number(children);
		return (_value < 0) || (_children < 0)
	}, [children, value])

	return (
		<TypoLabelView
			value={value}
			// isEmpty={isEmpty}
			isNegative={isNegative}
			{...rest} >
			{children}
		</TypoLabelView>
	)
};

TypoLabelContainer.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	stringify: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
};

TypoLabelContainer.displayName = "TypoLabelContainer";
export default TypoLabelContainer;