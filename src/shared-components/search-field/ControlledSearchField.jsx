import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import SearchField from "@/shared-components/search-field/SearchField";

export const ControlledSearchField = ({
	name,
	control,
	rules,
	defaultValue = "",
	onChange: handleChange,
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => (
				<SearchField
					ref={ref}
					value={value}
					onChange={(v) => {
						onChange(v);
						if (handleChange) {
							handleChange(v);
						}
					}}
					error={!!error}
					helperText={error?.message}
					{...rest}
				/>
			)}
		/>
	);
};

ControlledSearchField.displayName = "ControlledSearchField";
ControlledSearchField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object,
	rules: PropTypes.object,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
};
