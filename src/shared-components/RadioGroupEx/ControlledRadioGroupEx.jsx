import PropTypes from "prop-types";
import ControllerWrapper from "../ControllerWrapper";
import RadioGroupExView from "./RadioGroupExView";

const ControlledRadioGroupEx = ({
	name,
	control,
	rules,
	defaultValue = null,
	onChange: handleChange,
	...rest
}) => {

	return (
		<ControllerWrapper name={name} control={control} defaultValue={defaultValue} rules={rules}>
			{({ value, onChange, ref, error }) => (
				<RadioGroupExView
					ref={ref}
					value={value}

					onChange={(e) => {
						onChange(e.target.value);
						if (handleChange) {
							handleChange(e.target.value);
						}
					}}
					error={!!error}
					helperText={error?.message}
					{...rest}
				/>
			)}
		</ControllerWrapper>
	);
};

ControlledRadioGroupEx.displayName = "ControlledRadioGroupEx";
ControlledRadioGroupEx.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object,
	rules: PropTypes.object,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func
};

export default ControlledRadioGroupEx;