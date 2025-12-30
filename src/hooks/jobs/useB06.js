/* eslint-disable no-mixed-spaces-and-tabs */
import { B05Context } from "@/modules/B05/B05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import B06 from "@/modules/md-b06";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useCallback, useContext, useMemo } from "react";
import useJotaReports from "../useJotaReports";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { ConfigContext } from "shared-components/config";

export const useB06 = () => {
	const auth = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		moduleId: "B06",
	});

	const b05 = useContext(B05Context);

	const listLoader = useInfiniteLoader({
		url: "v1/prod/inquiry-details",
		bearer: auth.token,
		initialFetchSize: 50,
	});

	const handleInqIdClick = useCallback(
		(e, rowData) => {
			e?.stopPropagation();
			console.log("handleInqIdClick", rowData);
			if (b05 && rowData.InqID_N) {
				b05.cancelAction();
				b05.loadItem({ id: rowData.InqID_N });
			}
		},
		[b05]
	);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log(`onSearchSubmit`, data);
			const collected = B06.transformForSearchSubmitting(data);
			console.log("collected", collected);

			listLoader.loadList({
				params: collected,
			});
		},
		[listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebB06Rep.aspx`;
	}, [config.REPORT_URL]);

	const reports = useJotaReports({ from: "InqDate1", to: "InqDate2" });

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const collected = {
				...B06.transformForPrinting(data),
				DeptID: auth.operator?.CurDeptID,
			};
			console.log("collected", collected);

			reports.open(reportUrl, collected);
		},
		[auth.operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(
		({ setValue }) =>
			(outputType) => {
				console.log("handlePrint", outputType);
				setValue("outputType", outputType);
			},
		[]
	);

	return {
		...listLoader,
		// Popper
		onSearchSubmit,
		onSearchSubmitError,
		onPrintSubmit,
		onPrintSubmitError,
		// handleSelect,
		...appModule,
		handleInqIdClick,
		handlePrint,
	};
};
