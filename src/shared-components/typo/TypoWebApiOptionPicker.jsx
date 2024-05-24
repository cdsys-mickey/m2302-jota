import { ControlledWebApiOptionPicker } from "@/shared-components/controlled/ControlledWebApiOptionPicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import TypoChips from "@/shared-components/typo/TypoChips";
import Types from "@/shared-modules/sd-types";

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
			typoChip = false,
			// METHODS
			getOptionLabel,
			renderTagLabel,
			getOptionKey,
			disableClose,
			...rest
		} = props;

		const value = useWatch({
			name,
		});

		const memoisedText = useMemo(() => {
			const renderOption = renderTagLabel || getOptionLabel;
			if (children) {
				return children;
			}
			if (multiple) {
				if (!Types.isArray(value)) {
					console.warn("value is not an array!", value);
				}
				// console.log("multiple value", value);
				return value
					?.map((i) => (renderOption ? renderOption(i) : i))
					.join(", ");
			}
			return getOptionLabel ? getOptionLabel(value) : value;
		}, [children, getOptionLabel, multiple, renderTagLabel, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
					emptyText={emptyText}
					{...typographyProps}>
					{typoChip ? (
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
				renderTagLabel={renderTagLabel}
				disableClose={disableClose}
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
	renderTagLabel: PropTypes.func,

	// for Typography
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	label: PropTypes.string,
	typoVariant: PropTypes.string,
	typographyProps: PropTypes.object,
	emptyText: PropTypes.string,
	typoChip: PropTypes.bool,

	// for input
	name: PropTypes.string,
	size: PropTypes.string,

	//for crud context
	editing: PropTypes.bool,
	disableClose: PropTypes.bool,
};

export default TypoWebApiOptionPicker;
