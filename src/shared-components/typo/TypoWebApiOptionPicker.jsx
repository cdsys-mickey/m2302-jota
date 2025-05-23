import { ControlledWebApiOptionPicker } from "@/shared-components/controlled/ControlledWebApiOptionPicker";
import { FormFieldLabel } from "@/shared-components";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";
import TypoChips from "@/shared-components/typo/TypoChips";
import Types from "@/shared-modules/Types.mjs";

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
			typoProps,
			// 這裡先指定 emptyText 會導致下層誤判為有內容
			// emptyText = "(空白)",
			emptyText,
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

		const _text = useMemo(() => {
			const renderOption = renderTagLabel || getOptionLabel;
			if (children) {
				return children;
			}
			if (multiple) {
				if (!value || !Types.isArray(value) || value.length === 0) {
					return emptyText;
				}

				return value
					?.map((i) => (renderOption ? renderOption(i) : i))
					.join(", ");
			}
			return (
				(getOptionLabel ? getOptionLabel(value) : value)
			);
		}, [
			children,
			emptyText,
			getOptionLabel,
			multiple,
			renderTagLabel,
			value,
		]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
					emptyText={emptyText}
					{...typoProps}>
					{typoChip ? (
						<TypoChips
							value={value}
							getOptionLabel={getOptionLabel}
							getOptionKey={getOptionKey}
						/>
					) : (
						_text
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
	typoProps: PropTypes.object,
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
