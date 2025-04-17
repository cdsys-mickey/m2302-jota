import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { useContext } from "react";
import ZA03 from "../../../../../modules/ZA03.mjs";
import { ZA03AuthBatchCancelButtonContainer } from "./ZA03AuthBatchCancelButtonContainer";
import { ZA03AuthBatchEditButtonContainer } from "./ZA03AuthBatchEditButtonContainer";
import { ZA03AuthBatchSubmitButtonContainer } from "./ZA03AuthBatchSubmitButtonContainer";
import { ZA03AuthCopyButtonContainer } from "./ZA03AuthCopyButtonContainer";
import { ZA03AuthDeptPickerContainer } from "./ZA03AuthDeptPickerContainer";
import { ZA03AuthInstantEditFinishButtonContainer } from "./ZA03AuthInstantEditFinishButtonContainer";

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
			<ZA03AuthCopyButtonContainer>複製權限</ZA03AuthCopyButtonContainer>
			{/* <ZA03AuthAddButtonContainer /> */}
			{/* 即時編輯 */}
			{/* <ZA03AuthInstantEditButtonContainer /> */}
			{/* <ZA03AuthInstantEditFinishButtonContainer
				color="secondary"
				variant="contained"
				disableElevation
			/> */}

			{/* 批次編輯 */}
			<ZA03AuthBatchEditButtonContainer color="primary">
				編輯
			</ZA03AuthBatchEditButtonContainer>
			<ZA03AuthBatchCancelButtonContainer
				variant="outlined"
				color="primary"
				disableElevation>
				取消
			</ZA03AuthBatchCancelButtonContainer>
			<ZA03AuthBatchSubmitButtonContainer
				variant="contained"
				color="primary"
				disableElevation>
				儲存
			</ZA03AuthBatchSubmitButtonContainer>
			{/* <ZA03AuthLockRowsSwitchContainer /> */}
		</>
	);
};

export const ZA03AuthToolbarContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	if (za03.selectedTab !== ZA03.Tabs.AUTH) {
		return false;
	}

	return (
		<ListToolbar
			// pt={1}
			// LeftComponent={ZA03AuthToolbarRightComponents}
			// LeftComponent={ZA03AuthToolbarLeftComponents}
			RightComponent={ZA03AuthToolbarRightComponents}
			LeftProps={
				{
					// flexGrow: 1,
				}
			}
			RightProps={{
				flexGrow: 1,
			}}
		/>
	);
};

ZA03AuthToolbarContainer.propTypes = {};

ZA03AuthToolbarContainer.displayName = "ZA03AuthToolbarContainer";
