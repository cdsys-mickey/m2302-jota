import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import { useContext } from "react";
import PropTypes from "prop-types";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const ZA03AuthBatchEditButtonContainer = (props) => {
	const { children, ...rest } = props;
	const za03 = useContext(ZA03Context);

	if (za03.authGridEditing) {
		return false;
	}

	return (
		<ResponsiveButton
			startIcon={<EditOutlinedIcon />}
			onClick={za03.goAuthBatchEditing}
			{...rest}>
			{children}
		</ResponsiveButton>
	);
};
ZA03AuthBatchEditButtonContainer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
};
ZA03AuthBatchEditButtonContainer.displayName =
	"ZA03AuthBatchEditButtonContainer";
