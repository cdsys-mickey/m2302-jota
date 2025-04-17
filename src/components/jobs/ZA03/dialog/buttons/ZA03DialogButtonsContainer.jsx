/* eslint-disable no-mixed-spaces-and-tabs */
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import ZA03DialogEditButtons from "./ZA03DialogEditButtons";
import ZA03DialogViewButtons from "./ZA03DialogViewButtons";

import FlexBox from "@/shared-components/FlexBox";
import { ZA03AuthAddButtonContainer } from "../../form/auth/ZA03AuthAddButtonContainer";
import { ZA03AuthDeptPickerContainer } from "../../form/auth/ZA03AuthDeptPickerContainer";
import { ZA03AuthLockRowsSwitchContainer } from "../../form/auth/ZA03AuthLockRowsSwitchContainer";
import ZA03 from "@/modules/ZA03.mjs";

export const ZA03DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const forms = useFormContext();

	if (!za03.itemDataReady) {
		return false;
	}

	// 功能權限
	if (za03.selectedTab === ZA03.Tabs.AUTH) {
		return (
			<FlexBox
				inline
				fullWidth
				justifyContent="flex-end"
				sx={[
					(theme) => ({
						"& button, & .MuiFormGroup-root": {
							marginLeft: theme.spacing(1),
						},
					}),
				]}>
				<ZA03AuthAddButtonContainer />
				<ZA03AuthLockRowsSwitchContainer />
				<ZA03AuthDeptPickerContainer width="14em" />
			</FlexBox>
		);
	}

	// 基本資料(編輯中)
	if (za03.editing) {
		return (
			<ZA03DialogEditButtons
				onSave={forms.handleSubmit(
					za03.onEditorSubmit,
					za03.onEditorSubmitError
				)}
				onCancel={
					za03.creating
						? za03.confirmQuitCreating
						: za03.confirmReturnReading
				}
				loading={za03.editWorking}
				{...rest}
			/>
		);
	}

	// 基本資料
	return (
		<ZA03DialogViewButtons
			onEdit={za03.promptUpdating}
			onDelete={za03.confirmDelete}
			{...rest}
		/>
	);
};

ZA03DialogButtonsContainer.displayName = "ZA03DialogButtonsContainer";
