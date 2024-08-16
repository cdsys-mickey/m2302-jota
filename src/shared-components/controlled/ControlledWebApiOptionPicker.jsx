/* eslint-disable no-mixed-spaces-and-tabs */
import WebApiOptionPicker from "@/shared-components/option-picker/WebApiOptionPicker";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

/**
 * 由 name 屬性決定是否要使用 Controller 包覆
 * @param {*} param0
 * @returns
 */
export const ControlledWebApiOptionPicker = memo(
	({
		name,
		control,
		rules,
		labelShrink = false,
		defaultValue = null,
		sx = [],
		onChange: _onChange,
		onChanged,
		...rest
	}) => {
		const form = useFormContext();
		const { setFocus } = form || {};
		const { getNextField, nextField, isFieldDisabled } =
			useContext(FormMetaContext) || {};

		const prevValue = useRef();

		const getError = useCallback(
			async (opts = { debug: false }) => {
				if (!name) {
					return;
				}
				const result = await form.trigger(name);
				if (result) {
					return false;
				}
				const fieldState = form.getFieldState(name);
				console.error(`${name}.fieldState.error`, fieldState.error);
				return fieldState.error;
			},
			[form, name]
		);

		if (!name) {
			return (
				<WebApiOptionPicker
					sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
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
					field: { value, onChange, ref },
					fieldState: { error },
				}) => {
					prevValue.current = JSON.stringify(value);

					return (
						<WebApiOptionPicker
							name={name}
							inputRef={ref}
							value={value}
							sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
							getError={getError}
							setError={form.setError}
							clearErrors={form.clearErrors}
							// Focus Control
							setFocus={setFocus}
							getNextField={getNextField}
							nextField={nextField}
							isFieldDisabled={isFieldDisabled}
							onChange={(newValue) => {
								if (_onChange) {
									_onChange(newValue);
								}
								onChange(newValue);

								const newValueJson = JSON.stringify(newValue);

								if (
									onChanged &&
									newValueJson !== prevValue.current
								) {
									onChanged(newValue);
									prevValue.current = newValueJson;
									console.log(`[${name}].changed`, newValue);
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
