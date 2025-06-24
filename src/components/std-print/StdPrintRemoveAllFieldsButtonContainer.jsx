import ResponsiveLoadingButton from "@/shared-components/ButtonEx/ResponsiveLoadingButtonContainer";
import { useContext } from "react";
import { StdPrintContext } from "../../contexts/std-print/StdPrintContext";
import PropTypes from "prop-types";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

export const StdPrintRemoveAllFieldsButtonContainer = (props) => {
	const { children = "移除所有欄位", ...rest } = props;
	const stdPrint = useContext(StdPrintContext);
	return (
		<ResponsiveLoadingButton
			variant="contained"
			color="neutral"
			endIcon={<KeyboardDoubleArrowLeftIcon />}
			onClick={stdPrint.handleRemoveAllFields}
			{...rest}>
			{children}
		</ResponsiveLoadingButton>
	);
};
StdPrintRemoveAllFieldsButtonContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
StdPrintRemoveAllFieldsButtonContainer.displayName =
	"StdPrintRemoveAllFieldsButtonContainer";
