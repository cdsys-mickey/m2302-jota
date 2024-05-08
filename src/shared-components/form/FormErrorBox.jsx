import { memo } from "react";
import AlertEx from "../AlertEx";
import FlexBox from "../FlexBox";
import PropTypes from "prop-types";

const FormErrorBox = memo((props) => {
	const { error, ...rest } = props;
	if (!error) {
		return false;
	}
	return (
		<FlexBox alignItems="center" justifyContent="center" height="72vh">
			<AlertEx
				variant="filled"
				minWidth="20em"
				title="讀取失敗"
				error={error}
				{...rest}
			/>
		</FlexBox>
	);
});

FormErrorBox.propTypes = {
	error: PropTypes.object,
};

FormErrorBox.displayName = "FormErrorBox";
export default FormErrorBox;
