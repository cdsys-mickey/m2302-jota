import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { memo } from "react";
import { ZA03AuthAddButtonContainer } from "./ZA03AuthAddButtonContainer";
import { ZA03AuthBatchEditButtonContainer } from "./ZA03AuthBatchEditButtonContainer";
import { ZA03AuthBatchSubmitButtonContainer } from "./ZA03AuthBatchSubmitButtonContainer";
import { ZA03AuthBatchCancelButtonContainer } from "./ZA03AuthBatchCancelButtonContainer";
import { ZA03AuthDeptPickerContainer } from "./ZA03AuthDeptPickerContainer";
import { ZA03AuthInstantEditButtonContainer } from "./ZA03AuthInstantEditButtonContainer";
import { ZA03AuthInstantEditFinishButtonContainer } from "./ZA03AuthInstantEditFinishButtonContainer";
import { ZA03AuthCopyButtonContainer } from "./ZA03AuthCopyButtonContainer";
import { useContext } from "react";
import { ZA03Context } from "../../../../../contexts/ZA03/ZA03Context";

const ZA03AuthToolbarLeftComponents = () => {
	return (
		<>
			<ZA03AuthDeptPickerContainer
				name="dept"
				width="14em"
				sx={{
					backgroundColor: "#fff",
				}}
			/>
		</>
	);
};

const ZA03AuthToolbarRightComponents = () => {
	const za03 = useContext(ZA03Context);

	if (!za03.selectedDept) {
		return false;
	}

	return (
		<>
			<ZA03AuthCopyButtonContainer />
			<ZA03AuthAddButtonContainer />
			<ZA03AuthInstantEditButtonContainer />
			<ZA03AuthInstantEditFinishButtonContainer
				color="secondary"
				variant="contained"
				disableElevation
			/>

			<ZA03AuthBatchEditButtonContainer color="warning" />
			<ZA03AuthBatchSubmitButtonContainer
				variant="contained"
				color="warning"
				disableElevation
			/>
			<ZA03AuthBatchCancelButtonContainer
				variant="contained"
				color="neutral"
				disableElevation
			/>
			{/* <ZA03AuthLockRowsSwitchContainer /> */}
		</>
	);
};

const ZA03AuthToolbar = (props) => {
	const { ...rest } = props;

	return (
		<FlexToolbar
			pt={1}
			LeftComponent={ZA03AuthToolbarLeftComponents}
			RightComponent={ZA03AuthToolbarRightComponents}
			LeftProps={{
				flex: 1,
			}}
			RightProps={{
				flex: 1,
			}}
		/>
	);
};

ZA03AuthToolbar.propTypes = {};

ZA03AuthToolbar.displayName = "ZA03AuthToolbar";
export default ZA03AuthToolbar;
