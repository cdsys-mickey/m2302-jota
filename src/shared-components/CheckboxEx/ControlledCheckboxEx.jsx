/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useContext } from "react";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { useMemo } from "react";
import CheckboxExView from "./CheckboxExView";

const ControlledCheckboxEx = ({
	name,
	readOnly,
	control,
	rules,
	onChange,
	value,
	// onKeyDown,
	// onChanged,
	checkedToValue,
	valueToChecked,
	defaultValue = null,
	focusNextFieldBySpace = true,
	...rest
}) => {
	const { isFieldDisabled, handleFocusNextField } = useContext(FormMetaContext) || {};
	const { setFocus, setValue } = useFormContext() || {};

	const toggleChecked = useCallback(
		(e) => {
			console.log("e.target.checked", e.target.checked);
			const newValue = checkedToValue
				? checkedToValue(!e.target.checked)
				: !e.target.checked;
			setValue(name, newValue);
			if (onChange) {
				onChange(newValue);
			}
		},
		[onChange, checkedToValue, name, setValue]
	);

	const handleKeyDown = useCallback(
		(e) => {
			// if (onKeyDown) {
			// 	onKeyDown(e);
			// }
			console.log("handleKeyDown:", `"${e.key}"`);
			if (e.key === "Enter" || e.key === "Tab" || e.key === " ") {
				// 特殊按鍵不要觸發預設行為
				e.preventDefault();
				if (e.key === " ") {
					toggleChecked(e);
					if (!focusNextFieldBySpace) {
						return;
					}
				}

				if (handleFocusNextField) {
					e.preventDefault();
					handleFocusNextField(name, {
						setFocus,
						isFieldDisabled,
						forward: !e.shiftKey,
						e
					});
				}
			}
		},
		[handleFocusNextField, toggleChecked, focusNextFieldBySpace, name, setFocus, isFieldDisabled]
	);

	// const handleKeyUp = useCallback(
	// 	(e) => {
	// 		console.log("handleKeyUp:", `"${e.key}"`);
	// 		if (e.key === " ") {
	// 			if (getNextField) {
	// 				const nextField = getNextField(name, {
	// 					forward: !e.shiftKey,
	// 					isFieldDisabled,
	// 				});
	// 				console.log("nextField", nextField);
	// 				if (nextField) {
	// 					// e.preventDefault();
	// 					setFocus(nextField.name, {
	// 						shouldSelect: nextField.select,
	// 					});
	// 				}
	// 			}
	// 		}
	// 	},
	// 	[getNextField, isFieldDisabled, name, setFocus]
	// );

	const checked = useMemo(() => {
		return valueToChecked ? valueToChecked(value) : value
	}, [value, valueToChecked]);

	if (!name) {
		return (
			<CheckboxExView
				onKeyDown={handleKeyDown}
				checked={checked}
				onChange={onChange}
				value={value}
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
				field,
				fieldState: { error },
			}) => (
				<CheckboxExView
					inputRef={field.ref}
					checked={valueToChecked ? valueToChecked(value) : value}
					onKeyDown={handleKeyDown}
					// onKeyUp={handleKeyUp}
					onChange={
						readOnly
							? null
							: (e) => {
								const newValue = checkedToValue
									? checkedToValue(e.target.checked)
									: e.target.checked;
								if (onChange) {
									onChange(newValue);
								}

								field.onChange(newValue);
							}
					}
					inputProps={readOnly ? { readOnly: true } : null}
					error={error}
					helperText={error?.message}
					{...rest}
				/>
			)}
		/>
	);
};

export default ControlledCheckboxEx;

ControlledCheckboxEx.propTypes = {
	name: PropTypes.string,
	readOnly: PropTypes.bool,
	control: PropTypes.object,
	rules: PropTypes.object,
	// onKeyDown: PropTypes.func,
	onChange: PropTypes.func,
	onChanged: PropTypes.func,
	checkedToValue: PropTypes.func,
	valueToChecked: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
		PropTypes.number,
		PropTypes.object,
	]),
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
		PropTypes.number,
		PropTypes.object,
	]),
	focusNextFieldBySpace: PropTypes.bool
};
