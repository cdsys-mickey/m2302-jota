import PropTypes from "prop-types";
import { StdPrintResetButtonContainer } from "./StdPrintResetButtonContainer";
import { StdPrintAddAllFieldsButtonContainer } from "./StdPrintAddAllFieldsButtonContainer";
import { StdPrintRemoveAllFieldsButtonContainer } from "./StdPrintRemoveAllFieldsButtonContainer";
import StdPrintOutputModePicker from "./StdPrintOutputModePicker";
import StdPrint from "../../modules/md-std-print";

const StdPrintActionButtons = () => {
	return (
		<>
			<StdPrintOutputModePicker
				dense
				variant="outlined"
				size="small"
				width="140px"
				name="mode"
				label=""
				placeholder="輸出格式"
				BoxProps={{
					mr: 1,
				}}
				defaultValue={StdPrint.getById(StdPrint.OutputModes.HTML)}
			/>
			<StdPrintResetButtonContainer />
			<StdPrintRemoveAllFieldsButtonContainer />
			<StdPrintAddAllFieldsButtonContainer />
		</>
	);
};

StdPrintActionButtons.propTypes = {};

StdPrintActionButtons.displayName = "StdPrintActionButtons";
export default StdPrintActionButtons;
