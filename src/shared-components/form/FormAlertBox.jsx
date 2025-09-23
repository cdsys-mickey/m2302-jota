import { memo } from "react";
import AlertEx from "../AlertEx";
import FlexBox from "../FlexBox";
import PropTypes from "prop-types";

const FormAlertBox = memo((props) => {
	const { title, slotProps, ...rest } = props;

	return (
		<FlexBox alignItems="center" justifyContent="center" height="72vh">
			<AlertEx
				variant="filled"
				minWidth="20em"
				title={title}
				{...slotProps?.alert}
				{...rest}
			/>
		</FlexBox>
	);
});

FormAlertBox.propTypes = {
	slotProps: PropTypes.object,
	title: PropTypes.string,
};

FormAlertBox.displayName = "FormAlertBox";
export default FormAlertBox;
