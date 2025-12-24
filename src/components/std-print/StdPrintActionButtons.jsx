import { FlexBox } from "shared-components";
import { StdPrintAddAllFieldsButtonContainer } from "./StdPrintAddAllFieldsButtonContainer";
import { StdPrintRemoveAllFieldsButtonContainer } from "./StdPrintRemoveAllFieldsButtonContainer";

const StdPrintActionButtons = () => {
	return (
		<>
			<StdPrintRemoveAllFieldsButtonContainer />
			<StdPrintAddAllFieldsButtonContainer />
			{/* <StdPrintResetButtonContainer /> */}
			<FlexBox flexGrow={1} />
			{/* <StdPrintOutputModePicker
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
				defaultValue={StdPrint.getDefaultOption()}
				disableClearable
			/> */}
		</>
	);
};

StdPrintActionButtons.propTypes = {};

StdPrintActionButtons.displayName = "StdPrintActionButtons";
export default StdPrintActionButtons;
