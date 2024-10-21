import PropTypes from "prop-types";
import { StdPrintResetButtonContainer } from "./StdPrintResetButtonContainer";
import { StdPrintAddAllFieldsButtonContainer } from "./StdPrintAddAllFieldsButtonContainer";
import { StdPrintRemoveAllFieldsButtonContainer } from "./StdPrintRemoveAllFieldsButtonContainer";
import StdPrintOutputModePicker from "./StdPrintOutputModePicker";
import StdPrint from "../../modules/md-std-print";
import FlexBox from "../../shared-components/FlexBox";

const StdPrintActionButtons = () => {
	return (
		<>
			<StdPrintRemoveAllFieldsButtonContainer />
			<StdPrintAddAllFieldsButtonContainer />
			{/* <StdPrintResetButtonContainer /> */}
			<FlexBox flexGrow={1} />
			<StdPrintOutputModePicker
				dense
				variant="outlined"
				size="small"
				width="140px"
				name="mode"
				label=""
				placeholder="輸出格式"
				BoxProps={
					{
						// ml: 1,
					}
				}
				defaultValue={StdPrint.findById(StdPrint.OutputModes.HTML)}
				disableClearable
			/>
		</>
	);
};

StdPrintActionButtons.propTypes = {};

StdPrintActionButtons.displayName = "StdPrintActionButtons";
export default StdPrintActionButtons;
