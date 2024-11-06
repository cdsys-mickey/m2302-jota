import DialogEx from "@/shared-components/dialog/DialogEx";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/auth/AuthContext";
import AuthDeptPicker from "@/components/AuthDeptPicker";
import FlexBox from "@/shared-components/FlexBox";
import { useMemo } from "react";

export const DeptSwitchDialogContainer = () => {
	const form = useForm();
	const auth = useContext(AuthContext);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			auth.onDeptSwitchSubmit,
			auth.onDeptSwitchSubmitError
		);
	}, [auth.onDeptSwitchSubmit, auth.onDeptSwitchSubmitError, form]);

	return (
		<FormProvider {...form}>
			<form>
				<DialogEx
					title="切換門市"
					onSubmit={handleSubmit}
					open={auth.deptSwitching}
					onClose={auth.cancelDeptSwitch}
					onCancel={auth.cancelDeptSwitch}
					buttonProps={{ size: "small" }}>
					<FlexBox py={1}>
						<AuthDeptPicker
							label="目的門市"
							name="newDept"
							autoFocus
							placeholder="請輸入代碼或名稱篩選"
							required
							rules={{
								required: "請選擇要前往的門市",
							}}
							onError={auth.handleError}
						// fullWidth
						/>
					</FlexBox>
				</DialogEx>
			</form>
		</FormProvider>
	);
};

DeptSwitchDialogContainer.displayName = "DeptSwitchDialogContainer";
