/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, useFormContext } from "react-hook-form";
import OptionPicker from "./OptionPicker";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

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
		options = [],
		...rest
	} = props;

	const form = useFormContext();
	const { setFocus } = form || {};
	const formMeta = useContext(FormMetaContext);
	const { getNextField, isFieldDisabled, nextField, disableEnter } = formMeta || {};
	const inFormMeta = !!formMeta;

	const prevValue = useRef();

	const getError = useCallback(
		async (opts = {}) => {
			const { debug = false } = opts;
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
		return <OptionPicker ref={ref} setFocus={setFocus} {...rest} />;
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
						inputRef={ref}
						value={value}
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						getError={getError}
						setError={form.setError}
						clearErrors={form.clearErrors}
						setFocus={setFocus}
						options={options}
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
						// FormMeta
						inFormMeta={inFormMeta}
						getNextField={getNextField}
						nextField={nextField}
						isFieldDisabled={isFieldDisabled}
						disableEnter={disableEnter}
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
	options: PropTypes.array,
	// labelShrink: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
