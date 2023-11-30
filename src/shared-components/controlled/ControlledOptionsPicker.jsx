/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller } from "react-hook-form";
import OptionsPicker from "../picker/OptionsPicker";
import PropTypes from "prop-types";

export const ControlledOptionsPicker = ({
	name,
	disabled = false,
	control,
	onChange: handleChange,
	rules,
	labelShrink = false,
	defaultValue = null,
	sx = [],
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
					<OptionsPicker
						value={value}
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						onChange={
							disabled
								? null
								: (e) => {
										onChange(e.target.value);
										if (handleChange) {
											handleChange(e.target.value);
										}
								  }
						}
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

ControlledOptionsPicker.propTypes = {
	name: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	control: PropTypes.object,
	onChange: PropTypes.func,
	rules: PropTypes.object,
	labelShrink: PropTypes.bool,
	defaultValue: PropTypes.node,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
