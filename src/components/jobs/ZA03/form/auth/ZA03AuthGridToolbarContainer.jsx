import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { useContext } from "react";
import ZA03 from "@/modules/ZA03.mjs";
import { ZA03AuthCheckAllButtonContainer } from "./buttons/ZA03AuthCheckAllButtonContainer";
import { ZA03AuthCheckSelectionButtonContainer } from "./buttons/ZA03AuthCheckSelectionButtonContainer";
import { ZA03AuthClearAllButtonContainer } from "./buttons/ZA03AuthClearAllButtonContainer";
import { ZA03AuthDeptPickerContainer } from "./ZA03AuthDeptPickerContainer";
import { ButtonGroup } from "@mui/material";
import { ZA03AuthClearSelectionButtonContainer } from "./ZA03AuthClearSelectionButtonContainer";

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
			<ButtonGroup>
				<ZA03AuthCheckSelectionButtonContainer
					variant="contained"
					color="info"
					className="no-margin-right">
					勾選
				</ZA03AuthCheckSelectionButtonContainer>
				<ZA03AuthClearSelectionButtonContainer
					variant="outlined"
					color="info">
					清除
				</ZA03AuthClearSelectionButtonContainer>
			</ButtonGroup>
			<ButtonGroup>
				<ZA03AuthCheckAllButtonContainer variant="contained" className="no-margin-right">
					全勾
				</ZA03AuthCheckAllButtonContainer>
				<ZA03AuthClearAllButtonContainer variant="outlined">
					全清
				</ZA03AuthClearAllButtonContainer>
			</ButtonGroup>
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
		<ListToolbar
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
