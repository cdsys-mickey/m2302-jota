/* eslint-disable no-mixed-spaces-and-tabs */
import WebApiOptionPicker from "@/shared-components/picker/WebApiOptionPicker";
import PropTypes from "prop-types";
import { useRef } from "react";
import { memo } from "react";
import { Controller } from "react-hook-form";

/**
 * 由 name 屬性決定是否要使用 Controller 包覆
 * @param {*} param0
 * @returns
 */
export const ControlledWebApiOptionPicker = memo(
	({
		name,
		// disabled = false,
		control,
		// required = false,
		rules,
		labelShrink = false,
		defaultValue = null,
		sx = [],
		onChange: onPickerChange,
		onChanged,
		...rest
	}) => {
		const prevValue = useRef();

		// console.log("rendering ControlledWebApiOptionPicker");
		if (!name) {
			return (
				<WebApiOptionPicker
					// required={required}
					sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
					// disabled={disabled}
					InputLabelProps={{
						...(labelShrink && { shrink: true }),
					}}
					defaultValue={defaultValue}
					{...rest}
				/>
			);
		}

		return (
			<Controller
				name={name}
				defaultValue={defaultValue}
				control={control}
				rules={rules}
				render={({
					field: { value, onChange },
					fieldState: { error },
				}) => {
					prevValue.current = JSON.stringify(value);

					return (
						<WebApiOptionPicker
							name={name}
							// required={required}
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
								}
							}}
							// disabled={disabled}
							InputLabelProps={{
								...(labelShrink && { shrink: true }),
							}}
							error={!!error}
							helperText={error?.message}
							{...rest}
						/>
					);
				}}
			/>
		);
	}
);
ControlledWebApiOptionPicker.displayName = "ControlledWebApiOptionPicker";

ControlledWebApiOptionPicker.propTypes = {
	name: PropTypes.string,
	// disabled: PropTypes.bool,
	control: PropTypes.object,
	// required: PropTypes.bool,
	rules: PropTypes.object,
	labelShrink: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	onChange: PropTypes.func,
	onChanged: PropTypes.func,
};
