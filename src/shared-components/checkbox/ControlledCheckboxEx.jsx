/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import CheckboxEx from "./CheckboxEx";

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
	onChange: PropTypes.func,
	checkedToValue: PropTypes.func,
	valueToChecked: PropTypes.func,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
		PropTypes.number,
		PropTypes.object,
	]),
};