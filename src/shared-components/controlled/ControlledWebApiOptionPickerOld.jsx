/* eslint-disable no-mixed-spaces-and-tabs */
import WebApiOptionPicker from "@/shared-components/option-picker/WebApiOptionPicker";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { memo } from "react";
import WebApiOptionPickerOld from "../option-picker/WebApiOptionPickerOld";

/**
 * 由 name 屬性決定是否要使用 Controller 包覆
 * @param {*} param0
 * @returns
 */
export const ControlledWebApiOptionPickerOld = memo(
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
		...rest
	}) => {
		console.log("rendering ControlledWebApiOptionPickerOld");
		if (!name) {
			return (
				<WebApiOptionPickerOld
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
					console.log("controller rendering");
					return (
						<WebApiOptionPickerOld
							name={name}
							// required={required}
							value={value}
							sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
							onChange={(newValue) => {
								if (onPickerChange) {
									onPickerChange(newValue);
								}
								onChange(newValue);
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
ControlledWebApiOptionPickerOld.displayName = "ControlledWebApiOptionPickerOld";

ControlledWebApiOptionPickerOld.propTypes = {
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
};
