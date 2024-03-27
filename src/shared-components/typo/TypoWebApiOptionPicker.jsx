import { ControlledWebApiOptionPicker } from "@/shared-components/controlled/ControlledWebApiOptionPicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import TypoChips from "@/shared-components/typo/TypoChips";

const TypoWebApiOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			// for OptionPicker
			label,
			multiple,
			children,
			readOnly = false,
			// for Typography
			typoVariant = "body1",
			typographyProps,
			emptyText = "(空白)",
			// Input
			name,
			editing = true,
			size = "small",
			variant = "outlined",
			chip = false,
			// METHODS
			getOptionLabel,
			getOptionKey,
			...rest
		} = props;

		const value = useWatch({
			name,
		});

		const memoisedText = useMemo(() => {
			// console.log(`${name}.memoisedText`, value);
			if (children) {
				return children;
			}
			if (multiple) {
				return value
					?.map((i) => (getOptionLabel ? getOptionLabel(i) : i))
					.join(", ");
			}
			return getOptionLabel ? getOptionLabel(value) : value;
		}, [children, getOptionLabel, multiple, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
					emptyText={emptyText}
					{...typographyProps}>
					{chip ? (
						<TypoChips
							value={value}
							getOptionLabel={getOptionLabel}
							getOptionKey={getOptionKey}
						/>
					) : (
						memoisedText
					)}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledWebApiOptionPicker
				name={name}
				label={label}
				multiple={multiple}
				ref={ref}
				variant={variant}
				size={size}
				// methods
				getOptionLabel={getOptionLabel}
				getOptionKey={getOptionKey}
				disabled={readOnly}
				{...rest}
			/>
		);
	})
);

TypoWebApiOptionPicker.displayName = "TypoWebApiOptionPicker";
TypoWebApiOptionPicker.propTypes = {
	// for OptionPicker
	value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	readOnly: PropTypes.bool,
	variant: PropTypes.string,
	multiple: PropTypes.bool,
	getOptionKey: PropTypes.func,
	getOptionLabel: PropTypes.func,

	// for Typography
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	label: PropTypes.string,
	typoVariant: PropTypes.string,
	typographyProps: PropTypes.object,
	emptyText: PropTypes.string,
	chip: PropTypes.bool,

	// for input
	name: PropTypes.string,
	size: PropTypes.string,

	//for crud context
	editing: PropTypes.bool,
};

export default TypoWebApiOptionPicker;
