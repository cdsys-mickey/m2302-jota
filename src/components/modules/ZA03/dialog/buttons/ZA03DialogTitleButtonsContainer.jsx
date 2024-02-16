/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ActionState from "@/shared-constants/action-state";
import ZA03DialogTitleEditButtons from "./ZA03DialogTitleEditButtons";
import ZA03DialogTitleViewButtons from "./ZA03DialogTitleViewButtons";
import Users from "../../../../../modules/md-users";
import { ZA03LockRowsSwitchContainer } from "../../form/auth/ZA03LockRowsSwitchContainer";
import ZA03AddAuthButtonContainer from "../../form/auth/ZA03AddAuthButtonContainer";
import { Box } from "@mui/material";
import FlexBox from "../../../../../shared-components/FlexBox";

export const ZA03DialogTitleButtonsContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const forms = useFormContext();

	// if (za03.readState !== ActionState.DONE) {
	if (!za03.itemDataReady) {
		return false;
	}

	if (za03.selectedTab === Users.Tabs.AUTH) {
		return (
			<FlexBox
				inline
				sx={[
					(theme) => ({
						"& button, & .MuiFormGroup-root": {
							marginLeft: theme.spacing(1),
						},
					}),
				]}>
				<ZA03AddAuthButtonContainer />
				<ZA03LockRowsSwitchContainer />
			</FlexBox>
		);
	}

	if (za03.editing) {
		return (
			<ZA03DialogTitleEditButtons
				onSave={forms.handleSubmit(
					za03.onEditorSubmit,
					za03.onEditorSubmitError
				)}
				loading={za03.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<ZA03DialogTitleViewButtons
			onEdit={za03.promptUpdating}
			onDelete={za03.confirmDelete}
			{...rest}
		/>
	);
};

ZA03DialogTitleButtonsContainer.displayName = "ZA03DialogTitleButtonsContainer";
