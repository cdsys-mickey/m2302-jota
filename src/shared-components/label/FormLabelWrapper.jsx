import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import FormFieldLabel from "../form/FormFieldLabel";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";

export const FormLabelWrapper = memo(
	forwardRef((props, ref) => {
		const {
			name,
			label,
			children,
			emptyText = "(空白)",
			typoProps,
			...rest
		} = props;

		const value = useWatch({
			name,
		});

		const memoisedText = useMemo(() => {
			return children || value;
		}, [children, value]);

		return (
			<FormFieldLabel
				ref={ref}
				label={label}
				emptyText={emptyText}
				{...typoProps}
				{...rest}>
				{memoisedText}
			</FormFieldLabel>
		);
	})
);

FormLabelWrapper.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	emptyText: PropTypes.string,
	typoProps: PropTypes.object,
};

FormLabelWrapper.displayName = "FormLabelWrapper";
