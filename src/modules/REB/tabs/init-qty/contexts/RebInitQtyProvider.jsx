import { createContext, useContext } from "react";
import { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useCrud } from "@/shared-hooks/useCrud";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { FormProvider, useForm } from "react-hook-form";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";
import { RebInitQtyContext } from "./RebInitQtyContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { toastEx } from "shared-components";
import { useWebApiAsync } from "@/shared-hooks";

export const RebInitQtyProvider = ({ children, ...rest }) => {
	const { token, operator } = useContext(AuthContext);
	const dialogs = useContext(DialogsContext);
	const form = useForm({
		defaultValues: {
			dept: operator ? {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			} : null,
			prod: null,
		},
	});
	const crud = useCrud();
	const { httpGetAsync, httpPostAsync } = useWebApiAsync();
	const formMeta = useFormMeta(
		`
			dept,
			prod,
			`,
	);

	const onSubmit = useCallback(async (formData) => {
		console.log("onSubmit", formData);
		const data = {
			prodId: formData.prod?.ProdID || "",
			deptId: formData.dept?.DeptID || ""
		}
		console.log("data", data);
		dialogs.confirm({
			message: `確定重新推算 ${formData.dept?.AbbrName || "所有門市"} ${formData.prod?.ProdData || "所有商品"}的期初庫存量?`,
			onConfirm: async () => {
				crud.startUpdating();
				try {
					const { status, error, payload } = await httpPostAsync({
						url: "v1/inv/taking/rebuild",
						bearer: token,
						data,
					});
					if (status.success) {
						crud.finishedUpdating();
						toastEx.success(
							payload?.message || "期初庫存量重整已成功"
						);
					} else {
						throw (
							error ??
							new Error(payload?.message || "發生未預期例外")
						);
					}
				} catch (err) {
					console.error(err);
					crud.failedUpdating(err);
					toastEx.error("重整失敗", err);
				}
			},
		});
	}, [crud, dialogs, httpPostAsync, token])

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, [])

	const contextValue = useMemo(() => ({
		onSubmit,
		onSubmitError,
		...crud,
		...rest
	}), [crud, onSubmit, onSubmitError, rest])

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta}>
				<RebInitQtyContext.Provider value={contextValue}>
					{children}
				</RebInitQtyContext.Provider>
			</FormMetaProvider>
		</FormProvider>
	);
};

RebInitQtyProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

