/* eslint-disable no-mixed-spaces-and-tabs */
import WebApiOptionPicker from "@/shared-components/picker/WebApiOptionPicker";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

export const ControlledWebApiOptionPicker = ({
	name,
	disabled = false,
	control,
	required = false,
	rules,
	labelShrink = false,
	defaultValue = null,
	sx = [],
	// onChange: handleChangeEx,
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<WebApiOptionPicker
						name={name}
						required={required}
						value={value}
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						onChange={onChange}
						// onChange={(v) => {
						// 	console.log("onChange", v);
						// 	onChange(v);
						// 	if (handleChangeEx) {
						// 		handleChangeEx(v);
						// 	}
						// }}
						disabled={disabled}
						InputLabelProps={{
							...(labelShrink && { shrink: true }),
						}}
						error={!!error}
						helperText={error?.message}
						{...rest}
					/>
				</>
			)}
		/>
	);
};

ControlledWebApiOptionPicker.propTypes = {
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	control: PropTypes.object,
	required: PropTypes.bool,
	rules: PropTypes.object,
	labelShrink: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
