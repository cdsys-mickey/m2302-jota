import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { useContext } from "react";
import ZA03 from "../../../../../modules/md-za03";
import { ZA03AuthCheckAllButtonContainer } from "./ZA03AuthCheckAllButtonContainer";
import { ZA03AuthCheckSelectionButtonContainer } from "./ZA03AuthCheckSelectionButtonContainer";
import { ZA03AuthClearAllButtonContainer } from "./ZA03AuthClearAllButtonContainer";
import { ZA03AuthDeptPickerContainer } from "./ZA03AuthDeptPickerContainer";

const ZA03AuthToolbarLeftComponents = () => {
	return (
		<>
			<ZA03AuthDeptPickerContainer
				// label="目前門市"
				dense
				name="authDept"
				width="14em"
				sx={[
					(theme) => ({
						backgroundColor: "#fff",
						marginRight: theme.spacing(1),
					}),
				]}
			/>
			<ZA03AuthCheckSelectionButtonContainer
				variant="contained"
				color="info">
				勾選
			</ZA03AuthCheckSelectionButtonContainer>
			<ZA03AuthCheckAllButtonContainer variant="contained">
				全勾
			</ZA03AuthCheckAllButtonContainer>
			<ZA03AuthClearAllButtonContainer variant="outlined">
				全清
			</ZA03AuthClearAllButtonContainer>
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
			<ZA03AuthCheckSelectionButtonContainer variant="contained">
				勾選
			</ZA03AuthCheckSelectionButtonContainer>
			{/* <ZA03AuthClearSelectionButtonContainer variant="outlined">
				清除
			</ZA03AuthClearSelectionButtonContainer> */}
		</>
	);
};

export const ZA03AuthGridToolbarContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	if (za03.selectedTab !== ZA03.Tabs.AUTH) {
		return false;
	}

	return (
		<FlexToolbar
			pt={1}
			LeftComponent={ZA03AuthToolbarLeftComponents}
			// RightComponent={ZA03AuthToolbarRightComponents}
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

ZA03AuthGridToolbarContainer.propTypes = {};

ZA03AuthGridToolbarContainer.displayName = "ZA03AuthGridToolbarContainer";
