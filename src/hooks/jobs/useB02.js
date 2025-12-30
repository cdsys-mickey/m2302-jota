import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import Forms from "@/shared-modules/Forms.mjs";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useState } from "react";
import useDebugDialog from "../useDebugDialog";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { ConfigContext } from "shared-components/config";

export const useB02 = (opts = {}) => {
	const { forNew } = opts;

	const JOB_NAME = useMemo(() => {
		return forNew ? "B04" : "B02";
	}, [forNew]);

	const API_URL = useMemo(() => {
		return forNew
			? "v1/quote/new-customer-quotes"
			: "v1/quote/customer-quotes";
	}, [forNew]);

	const crud = useContext(CrudContext);
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: JOB_NAME,
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selectedInq, setSelectedInq] = useState();

	const listLoader = useInfiniteLoader({
		url: API_URL,
		bearer: token,
		initialFetchSize: 50,
		params: {
			sort: 1,
		},
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SPrice: "",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "quotes",
		keyColumn: "pkey",
		createRow,
	});

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			InqDate: new Date(),
			quotes: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.quotes, { fillRows: true });
	}, [crud, grid]);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const handleGridProdChange = useCallback(({ rowData }) => {
		let processedRowData = { ...rowData };
		processedRowData = {
			...processedRowData,
			["SPrice"]: "",
			["SPackData_N"]: rowData?.prod?.PackData_N || "",
			["SProdData_N"]: rowData?.prod?.ProdData || "",
		};
		return processedRowData;
	}, []);

	const buildGridChangeHandler = useCallback(
		({ gridMeta }) =>
			(newValue, operations) => {
				console.log("buildGridChangeHandler", operations);
				const newGridData = [...newValue];
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						newValue
							.slice(operation.fromRowIndex, operation.toRowIndex)
							.forEach((rowData, i) => {
								const rowIndex = operation.fromRowIndex + i;
								const oldRowData = grid.gridData[rowIndex];

								let processedRowData = { ...rowData };

								if (
									rowData.prod?.ProdID !==
									oldRowData?.prod?.ProdID
								) {
									console.log(
										`[${rowIndex}]prod changed`,
										rowData?.prod
									);
									processedRowData = handleGridProdChange({
										rowData,
										oldRowData,
									});
								}

								newGridData[rowIndex] = processedRowData;
							});
					} else if (operation.type === "DELETE") {
						newGridData.splice(
							operation.fromRowIndex,
							operation.toRowIndex - operation.fromRowIndex + 1
						);
					} else if (operation.type === "CREATE") {
						console.log("dsg.CREATE");
						// process CREATE here
						gridMeta.toFirstColumn({ nextRow: true });
					}
				}
				console.log("after changed", newGridData);
				grid.setGridData(newGridData);
			},
		[grid, handleGridProdChange]
	);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		// console.log(`getRowKey, rowIndex: ${rowIndex}, rowData:`, rowData);
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	// 帶入商品
	const importProdsAction = useAction();

	const [ipState, setIpState] = useState({
		criteria: null,
		saveKey: null,
		totalElements: null,
		loading: false,
	});

	const transformForPrinting = useCallback(
		(data) => {
			return {
				...(data.outputType && {
					Action: data.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: JOB_NAME,

				CustID1: data.customer?.CustID || "",
				CustID2: data.customer2?.CustID || "",
				ProdID1: data.prod?.ProdID || "",
				ProdID2: data.prod2?.ProdID || "",
				QDate1: Forms.formatDate(data.date) || "",
				QDate2: Forms.formatDate(data.date2) || "",
				// OrderBy: data.orderBy?.id == 2 ? "ZA.ProdID, ZA.QDate DESC" : ""
				OrderBy: data.orderBy?.id,
			};
		},
		[JOB_NAME, operator?.CurDeptID]
	);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebB0204Rep.aspx`;
	}, [config.REPORT_URL]);

	const reports = useJotaReports({ from: "QDate1", to: "QDate2" });

	const onDebugSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = transformForPrinting(payload);
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
			reportUrl,
			transformForPrinting,
		]
	);

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const jsonData = transformForPrinting(data);
			console.log("jsonData", jsonData);
			reports.open(reportUrl, jsonData);
		},
		[reportUrl, reports, transformForPrinting]
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

	const loadProdFormMeta = useFormMeta(
		`
		sprod,
		eprod,
		typeA,
		catL,
		catM,
		catS
		`
	);

	return {
		...crud,
		...listLoader,
		...appModule,
		selectedInq,
		onSearchSubmit,
		onSearchSubmitError,
		promptCreating,
		// 報價 Grid
		...grid,
		grid,
		buildGridChangeHandler,
		getRowKey,
		// 帶入商品
		importProdsWorking: importProdsAction.working,
		promptImportProds: importProdsAction.prompt,
		cancelImportProds: importProdsAction.clear,
		importProdsDialogOpen: importProdsAction.active,
		ipState,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// handleLastField,
		loadProdFormMeta,
		...sideDrawer,
		forNew,
		onDebugSubmit,
		handlePrint,
	};
};
