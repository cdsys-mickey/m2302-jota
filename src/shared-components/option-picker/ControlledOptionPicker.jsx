/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, useFormContext } from "react-hook-form";
import OptionPicker from "./OptionPicker";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useState } from "react";
import useDebounce from "@/shared-hooks/useDebounce";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const ControlledOptionPicker = forwardRef((props, ref) => {
	const {
		name,
		control,
		rules,
		// labelShrink = false,
		defaultValue = null,
		sx = [],
		onChange: _onChange,
		onChanged,
		debounce = 800,
		readOnly,
		// options = [],
		...rest
	} = props;

	const form = useFormContext();
	const { setFocus } = form || {};
	const formMeta = useContext(FormMetaContext);
	const { isFieldDisabled, handleFocusNextField, disableEnter } = formMeta || {};
	const inFormMeta = !!formMeta;

	const [innerValue, setInnerValue] = useState();
	const debouncedValue = useDebounce(innerValue, debounce);

	useChangeTracking(() => {
		if (!readOnly && onChanged) {
			onChanged(debouncedValue);
		}
	}, [debouncedValue], {
		debug: true
	});

	// const prevValue = useRef();

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
		return <OptionPicker ref={ref} setFocus={setFocus} onChange={_onChange} {...rest} />;
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { isTouched, isDirty, error },
			}) => {
				// prevValue.current = JSON.stringify(value);

				return (
					<OptionPicker
						name={name}
						inputRef={ref}
						value={value}
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						getError={getError}
						setError={form.setError}
						clearErrors={form.clearErrors}

						// options={options}
						onChange={async (newValue) => {
							setInnerValue(newValue);
							console.log(`${ControlledOptionPicker.displayName}.onChange`, newValue);

							if (_onChange) {
								await _onChange(newValue);
							}

							onChange(newValue);

							// const newValueJson = JSON.stringify(newValue);

							// if (
							// 	onChanged &&
							// 	newValueJson !== prevValue.current
							// ) {
							// 	onChanged(newValue);
							// 	prevValue.current = newValueJson;
							// 	console.log(`${name}.changed`, newValue);
							// }
						}}
						// InputLabelProps={{
						// 	...(labelShrink && { shrink: true }),
						// }}
						error={!!error}
						helperText={error?.message}
						// FormMeta
						inFormMeta={inFormMeta}
						// formMeta={formMeta}
						isTouched={isTouched}
						isDirty={isDirty}
						// Focus Control
						setFocus={setFocus}
						// getNextField={getNextField}
						handleFocusNextField={handleFocusNextField}
						isFieldDisabled={isFieldDisabled}
						disableEnter={disableEnter}
						readOnly={readOnly}
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
	// options: PropTypes.array,
	// labelShrink: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
