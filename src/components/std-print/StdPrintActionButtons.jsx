import StdPrint from "@/modules/md-std-print";
import FlexBox from "@/shared-components/FlexBox";
import { StdPrintAddAllFieldsButtonContainer } from "./StdPrintAddAllFieldsButtonContainer";
import StdPrintOutputModePicker from "./StdPrintOutputModePicker";
import { StdPrintRemoveAllFieldsButtonContainer } from "./StdPrintRemoveAllFieldsButtonContainer";

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
