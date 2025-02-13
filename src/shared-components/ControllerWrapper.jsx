import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const ControllerWrapper = (props) => {
	const { name, control, defaultValue, rules, children } = props;
	// 如果沒有 name，直接回傳 children，不使用 Controller
	if (!name) {
		return children({ defaultValue, onChange: () => { }, ref: null, error: null });
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { value, onChange, ref }, fieldState: { error } }) =>
				children({ value, onChange, ref, error })
			}
		/>
	);
}
ControllerWrapper.propTypes = {
	name: PropTypes.string,
	control: PropTypes.object,
	defaultValue: PropTypes.any,
	rules: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
	onChange: PropTypes.func
}
export default ControllerWrapper;