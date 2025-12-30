import { AuthContext } from "@/contexts/auth/AuthContext";
import H01 from "@/modules/H01/H01.mjs";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useCallback, useContext, useMemo } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import { ConfigContext } from "shared-components/config";

export const useH01 = () => {
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "H01",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		InclTX,
		InclTest,
		orderType,
		orderDir,
		outputType,
		`
	);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebH01Rep.aspx`;
	}, [config.REPORT_URL]);

	const reports = useJotaReports({ from: "SDate", to: "EDate" });

	const onDebugSubmit = useCallback(
		(payload) => {
			console.log("onDebugSubmit", payload);
			const data = {
				...H01.transformForSubmitting(payload),
				DeptId: operator.CurDeptID,
			};
			debugDialog.show({
				data,
				url: reportUrl,
				title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}`,
			});
		},
		[
			appFrame.menuItemSelected?.JobID,
			appFrame.menuItemSelected?.JobName,
			debugDialog,
			operator.CurDeptID,
			reportUrl,
		]
	);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...H01.transformForSubmitting(payload),
				DeptId: operator.CurDeptID,
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[operator.CurDeptID, reportUrl, reports]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	const onSelect = useCallback(
		({ setValue }) =>
			(outputType) => {
				console.log("onBeforeSubmit", outputType);
				setValue("outputType", outputType);
			},
		[]
	);

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		onDebugSubmit,
		formMeta,
		onSelect,
	};
};
