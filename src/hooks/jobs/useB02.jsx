import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Forms from "@/shared-modules/sd-forms";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "./useAppModule";

export const useB02 = (opts = {}) => {
	const { forNew } = opts;

	const JOB_NAME = useMemo(() => {
		return forNew ? "B04" : "B02";
	}, [forNew]);

	const API_URL = useMemo(() => {
		return forNew ? "v1/quote/new-customer-quotes" : "v1/quote/customer-quotes";
	}, [forNew])


	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: JOB_NAME,
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selectedInq, setSelectedInq] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: API_URL,
		bearer: token,
		initialFetchSize: 50,
	});

	const grid = useDSG({
		gridId: "quotes",
		keyColumn: "pkey",
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SPrice: "",
		}),
		[]
	);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			InqDate: new Date(),
			quotes: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.quotes, { createRow });
	}, [createRow, crud, grid]);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const handleGridProdChange = useCallback(
		({ rowData }) => {
			let processedRowData = { ...rowData };
			processedRowData = {
				...processedRowData,
				["SPrice"]: "",
				["SPackData_N"]: rowData?.prod?.PackData_N || "",
				["SProdData_N"]: rowData?.prod?.ProdData || ""
			};
			return processedRowData;
		},
		[]
	);

	const buildGridChangeHandler = useCallback(
		({ gridMeta }) => (newValue, operations) => {
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
					newGridData.splice(operation.fromRowIndex, operation.toRowIndex - operation.fromRowIndex + 1);
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

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const { outputType } = data;
			const jsonData = {
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
				OrderBy: data.orderBy?.id
			};
			console.log("jsonData", jsonData);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebB0204Rep.aspx?LogKey=${operator?.LogKey}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[operator?.CurDeptID, operator?.LogKey, postToBlank]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);



	const loadProdFormMeta = useFormMeta(
		`
		sprod,
		eprod,
		typeA,
		catL,
		catM,
		catS
		`
	)

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
		forNew
	};
};
