/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import CheckboxEx from "./CheckboxEx";
import { useCallback } from "react";
import { useContext } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

const ControlledCheckboxEx = ({
	name,
	readOnly,
	control,
	rules,
	onChange: _onChange,
	// onKeyDown,
	onChanged,
	checkedToValue,
	valueToChecked,
	defaultValue = null,
	...rest
}) => {
	const { isFieldDisabled, nextField } = useContext(FormMetaContext) || {};
	const { setFocus, setValue } = useFormContext() || {};

	const toggleChecked = useCallback(
		(e) => {
			console.log("e.target.checked", e.target.checked);
			const newValue = checkedToValue
				? checkedToValue(!e.target.checked)
				: !e.target.checked;
			setValue(name, newValue);
		},
		[checkedToValue, name, setValue]
	);

	const handleKeyDown = useCallback(
		(e) => {
			// if (onKeyDown) {
			// 	onKeyDown(e);
			// }
			console.log("handleKeyDown:", `"${e.key}"`);
			if (e.key === "Enter" || e.key === "Tab" || e.key === " ") {
				if (e.key === " ") {
					toggleChecked(e);
				}
				// if (getNextField) {
				// 	const nextField = getNextField(name, {
				// 		forward: !e.shiftKey,
				// 		isFieldDisabled,
				// 	});
				// 	console.log("nextField", nextField);
				// 	if (nextField) {
				// 		e.preventDefault();
				// 		setFocus(nextField.name, {
				// 			shouldSelect: nextField.select,
				// 		});
				// 	}
				// }
				e.preventDefault();
				nextField(name, {
					setFocus,
					isFieldDisabled,
					forward: !e.shiftKey,
				});
			}
		},
		[nextField, name, setFocus, isFieldDisabled, toggleChecked]
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

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({
				field: { value, onChange, ref },
				fieldState: { error },
			}) => (
				<CheckboxEx
					inputRef={ref}
					checked={valueToChecked ? valueToChecked(value) : value}
					onKeyDown={handleKeyDown}
					// onKeyUp={handleKeyUp}
					onChange={
						readOnly
							? null
							: (e) => {
									if (_onChange) {
										_onChange(e);
									}
									const newValue = checkedToValue
										? checkedToValue(e.target.checked)
										: e.target.checked;
									onChange(newValue);
							  }
					}
					inputProps={readOnly ? { readOnly: true } : null}
					// InputProps={readOnly ? { disableUnderline: true } : null}
					disabled={readOnly}
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
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
		PropTypes.number,
		PropTypes.object,
	]),
};
