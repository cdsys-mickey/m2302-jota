/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller } from "react-hook-form";
import OptionPicker from "./OptionPicker";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useRef } from "react";

export const ControlledOptionPicker = forwardRef((props, ref) => {
	const {
		name,
		control,
		rules,
		// labelShrink = false,
		defaultValue = null,
		sx = [],
		onChange: onPickerChange,
		onChanged,
		...rest
	} = props;

	const prevValue = useRef();

	if (!name) {
		return <OptionPicker ref={ref} {...rest} />;
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => {
				prevValue.current = JSON.stringify(value);
				return (
					<OptionPicker
						name={name}
						ref={ref}
						value={value}
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						onChange={(newValue) => {
							if (onPickerChange) {
								onPickerChange(newValue);
							}
							onChange(newValue);
							const newValueJson = JSON.stringify(newValue);

							if (
								onChanged &&
								newValueJson !== prevValue.current
							) {
								onChanged(newValue);
								prevValue.current = newValueJson;
								console.log(`${name}.changed`, newValue);
							}
						}}
						// InputLabelProps={{
						// 	...(labelShrink && { shrink: true }),
						// }}
						error={!!error}
						helperText={error?.message}
						{...rest}
					/>
				);
			}}
		/>
	);
});
ControlledOptionPicker.displayName = "ControlledOptionPicker";
ControlledOptionPicker.propTypes = {
	name: PropTypes.string,
	control: PropTypes.object,
	onChange: PropTypes.func,
	onChanged: PropTypes.func,
	rules: PropTypes.object,
	// labelShrink: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};