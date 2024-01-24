import { memo } from "react";
import PropTypes from "prop-types";
import ChipEx from "../../shared-components/ChipEx";
import { ListItem } from "@mui/material";
import StdPrint from "../../modules/md-std-print";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const StdField = memo((props) => {
	const { name, type, ...rest } = props;
	return (
		<ChipEx
			// square
			label={name}
			fullWidth
			borderRadius={2}
			{...rest}
			deleteIcon={type === StdPrint.UNUSED ? <AddCircleIcon /> : null}
		/>
	);
});

StdField.propTypes = {
	name: PropTypes.string.isRequired,
};

StdField.displayName = "StdField";
export default StdField;
