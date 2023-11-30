/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { Controller } from "react-hook-form";
import CheckboxEx from "@/shared-components/CheckboxEx";
import PropTypes from "prop-types";

const ControlledCheckboxEx = ({
	name,
	readOnly,
	control,
	rules,
	onChange: handleCheckChange,
	checkedToValue,
	valueToChecked,
	defaultValue = null,
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<CheckboxEx
					checked={valueToChecked ? valueToChecked(value) : value}
					onChange={
						readOnly
							? null
							: (e) => {
									if (handleCheckChange) {
										handleCheckChange(e);
									}
									onChange(
										checkedToValue
											? checkedToValue(e.target.checked)
											: e.target.checked
									);
							  }
					}
					inputProps={
						readOnly
							? { readOnly: true, disableUnderline: true }
							: null
					}
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
	onChange: PropTypes.func,
	checkedToValue: PropTypes.func,
	valueToChecked: PropTypes.func,
	defaultValue: PropTypes.node,
};
