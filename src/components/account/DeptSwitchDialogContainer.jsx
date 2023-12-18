import DialogEx from "@/shared-components/dialog/DialogEx";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Stack } from "@mui/material";
import UserDeptPicker from "./UserDeptPicker";
import FlexBox from "@/shared-components/FlexBox";

export const DeptSwitchDialogContainer = () => {
	const form = useForm();
	const auth = useContext(AuthContext);

	return (
		<FormProvider {...form}>
			<DialogEx
				title="切換門市"
				open={auth.deptSwitching}
				onClose={auth.cancelDeptSwitch}
				onSubmit={form.handleSubmit(
					auth.onDeptSwitchSubmit,
					auth.onDeptSwitchSubmitError
				)}
				ButtonProps={{ size: "small" }}>
				<FlexBox py={1}>
					<UserDeptPicker
						label="目的門市"
						name="newDept"
						autoFocus
						placeholder="請輸入代碼或名稱篩選"
						rules={{
							required: "請選擇要前往的門市",
						}}
					/>
				</FlexBox>
			</DialogEx>
		</FormProvider>
	);
};

DeptSwitchDialogContainer.displayName = "DeptSwitchDialogContainer";
