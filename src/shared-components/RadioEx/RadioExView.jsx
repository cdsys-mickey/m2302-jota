import { memo } from "react";
import PropTypes from "prop-types";
import FormControlLabelWrapper from "../FormControlLabelWrapper";
import { Radio } from "@mui/material";

const RadioExView = memo((props) => {
	const { label, ...rest } = props;
	return (
		<FormControlLabelWrapper label={label}>
			<Radio {...rest} />
		</FormControlLabelWrapper>
	);
})

RadioExView.propTypes = {
	label: PropTypes.string
}

RadioExView.displayName = "RadioExView";
export default RadioExView;