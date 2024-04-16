import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import Users from "@/modules/md-users";
import ZA03 from "@/modules/md-za03";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useAction } from "@/shared-hooks/useAction";
import { useDSG } from "@/shared-hooks/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ActionState from "../../shared-constants/action-state";
import { useAppModule } from "./useAppModule";
import { useInit } from "../../shared-hooks/useInit";
import { useRef } from "react";
import CopyAuth from "../../modules/md-copy-auth";

export const useZA03 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;

	const { token, operator } = useContext(AuthContext);

	const [selectedDept, setSelectedDept] = useState();
	const [selectedTab, setSelectedTab] = useState(Users.Tabs.INFO);

	const appModule = useAppModule({
		token,
		moduleId: "ZA03",
	});
	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const loader = useInfiniteLoader({
		url: "v1/ou/users",
		bearer: token,
		initialFetchSize: 50,
	});

	const itemIdRef = useRef();

	// Auth Grid
	const authGrid = useDSG({
		gridId: "auth",
		// keyColumn: "module.JobID",
		keyColumn: "JobID",
	});
	// const { clearGridData, getRowDataByIndex } = authGrid;

	// const [selection, setSelection] = useState({
	// 	selectedModuleMin: null,
	// 	selectedModuleMax: null,
	// });

	const [authEditingMode, setAuthEditingMode] = useState();
	const loadAuthAction = useAction();
	const { clear: clearLoadAuth } = loadAuthAction;

	const loadUserAuthorities = useCallback(
		async (userId, deptId, opts = {}) => {
			const { supressLoading } = opts;
			try {
				if (!supressLoading) {
					loadAuthAction.start();
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/ou/user/authorities",
					bearer: token,
					params: {
						uid: userId,
						dp: deptId,
					},
				});
				if (status?.success) {
					const data = payload.map((x) =>
						ZA03.transformForReading(x)
					);
					authGrid.handleGridDataLoaded(data);
					loadAuthAction.finish();
				} else {
					throw error || new Error("讀取權限失敗");
				}
			} catch (err) {
				loadAuthAction.fail(err);
				toast.error(err?.message);
			}
		},
		[authGrid, httpGetAsync, loadAuthAction, token]
	);

	const reloadUserAuthorities = useCallback(
		(opts) => {
			if (crud.itemData?.UID && selectedDept?.DeptID) {
				loadUserAuthorities(
					crud.itemData?.UID,
					selectedDept?.DeptID,
					opts
				);
			}
		},
		[crud.itemData?.UID, selectedDept?.DeptID, loadUserAuthorities]
	);

	const goAuthInstantEditing = useCallback(() => {
		setAuthEditingMode(Users.AUTH_EDITING_MODE.CLICK);
	}, []);

	const goAuthBatchEditing = useCallback(() => {
		setAuthEditingMode(Users.AUTH_EDITING_MODE.SUBMIT);
	}, []);

	const cancelAuthEditing = useCallback(() => {
		setAuthEditingMode(null);
		reloadUserAuthorities({
			supressLoading: true,
		});
	}, [reloadUserAuthorities]);

	const confirmCancelAuthEditing = useCallback(() => {
		if (!authGrid.isDirty) {
			cancelAuthEditing();
		} else {
			dialogs.confirm({
				message: `確定要放棄編輯?`,
				onConfirm: () => {
					cancelAuthEditing();
				},
			});
		}
	}, [authGrid.isDirty, cancelAuthEditing, dialogs]);

	const stopInstantEditing = useCallback(() => {
		setAuthEditingMode(null);
	}, []);

	const authEditing = useMemo(() => {
		return !!authEditingMode;
	}, [authEditingMode]);

	const authGridLoading = useMemo(() => {
		return loadAuthAction.state === ActionState.WORKING;
	}, [loadAuthAction.state]);

	const handleDeptChange = useCallback(
		(dept) => {
			console.log("handleDeptChange", dept);
			setSelectedDept(dept);
			if (itemData?.UID && dept?.DeptID) {
				// 載入 grid
				loadUserAuthorities(crud.itemData?.UID, dept?.DeptID);
			} else {
				authGrid.clearGridData();
			}
		},
		[authGrid, crud.itemData?.UID, itemData?.UID, loadUserAuthorities]
	);

	const promptCreating = useCallback(async () => {
		crud.promptCreating({
			data: {
				LoginName: "",
				UserName: "",
				Tel: "",
				Cel: "",
				Email: "",
				// DeptID: operator.CurDeptID,
				// Dept_N: operator.CurDeptName,
				dept: {
					DeptID: operator.CurDeptID,
					AbbrName: operator.CurDeptName,
				},
				depts: [
					{
						DeptID: operator.CurDeptID,
						AbbrName: operator.CurDeptName,
					},
				],
			},
		});
	}, [crud, operator.CurDeptID, operator.CurDeptName]);

	const loadItem = useCallback(
		async ({ id, refresh = false }) => {
			const itemId = refresh ? itemIdRef.current : id;
			if (!refresh) {
				itemIdRef.current = id;
				crud.startReading("讀取中...", { id });
			}
			try {
				const { status, payload, error } = await httpGetAsync({
					url: `v1/ou/users`,
					bearer: token,
					params: {
						id: itemId,
						wdp: 1,
					},
				});

				if (status?.success) {
					const data = Users.transformForReading(payload);
					crud.doneReading({
						data,
					});
					setSelectedDept(data.dept);
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.UID });
		},
		[crud, loadItem]
	);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄新增?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmQuitUpdating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmReturnReading = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
			},
		});
	}, [crud, dialogs]);

	const handleDialogClose = useCallback(() => {
		crud.cancelAction();
	}, [crud]);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		// return rowData?.module?.JobID || rowIndex;
		return `${rowData?.module?.JobID}-${rowData?.Seq}` || rowIndex;
	}, []);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error, payload } = await httpPostAsync({
					url: "v1/ou/users",
					data: data,
					bearer: token,
				});

				if (status?.success) {
					const processed = Users.transformForReading(payload);
					toast.success(
						`使用者「${processed?.LoginName} ${processed?.UserName}」新增成功`
					);

					crud.doneCreating();
					crud.doneReading({
						data: processed,
					});
					// crud.cancelReading();
					// 重新整理
					loader.loadList({ refresh: true });
				} else {
					throw error || new Error("新增發生未預期例外");
				}
			} catch (err) {
				crud.failCreating(err);
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("新增失敗", err));
			}
		},
		[crud, httpPostAsync, loader, token]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				const { status, error } = await httpPutAsync({
					url: `v1/ou/users`,
					data: data,
					bearer: token,
				});

				if (status?.success) {
					toast.success(
						`使用者 ${data?.LoginName} ${data?.UserName}」修改成功`
					);
					crud.doneUpdating();
					// await loadItem(data?.UID);
					await loadItem({ refresh: true });
					// 重新整理
					loader.loadList({ refresh: true });
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error("handleUpdate.failed", err);
				toast.error(Errors.getMessage("修改失敗", err));
			}
		},
		[crud, httpPutAsync, loadItem, loader, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			const processed = Users.transformForEditorSubmit(data);
			console.log(`processed`, processed);
			if (crud.creating) {
				handleCreate({ data: processed });
			} else if (crud.updating) {
				handleUpdate({ data: processed });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.creating, crud.updating, handleCreate, handleUpdate]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`ZA03.onSubmitError`, err);
		toast.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除「${crud.itemData?.LoginName} ${crud.itemData?.UserName}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/ou/users`,
						bearer: token,
						params: {
							id: crud.itemData?.UID,
						},
					});
					crud.cancelAction();
					if (status?.success) {
						toast.success(
							`成功删除 ${crud.itemData?.LoginName} ${crud.itemData.UserName}`
						);
						loader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除失敗", err));
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, loader, token]);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log(`onSearchSubmit`, data);
			loader.loadList({
				params: data,
			});
		},
		[loader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const handleTabChange = useCallback(
		(e, newValue) => {
			setSelectedTab(newValue);
			if (
				newValue === Users.Tabs.AUTH &&
				loadAuthAction.state === null &&
				itemData?.UID &&
				selectedDept?.DeptID
			) {
				// 載入 grid
				loadUserAuthorities(crud.itemData?.UID, selectedDept?.DeptID);
			}
		},
		[
			crud.itemData?.UID,
			selectedDept?.DeptID,
			itemData?.UID,
			loadAuthAction.state,
			loadUserAuthorities,
		]
	);

	const handleFunctionEnabled = useCallback(
		async (moduleId, funcId, enabled) => {
			try {
				const { status, error } = await httpPatchAsync({
					url: `v1/ou/user/authorities/${
						enabled ? "enable" : "disable"
					}`,
					bearer: token,
					params: {
						uid: crud.itemData?.UID,
						md: moduleId,
						fn: funcId,
						dp: selectedDept?.DeptID,
					},
				});
				if (!status?.success) {
					throw error || new Error("權限異動異常");
				}
			} catch (err) {
				toast.error(
					Errors.getMessage(`更新 ${moduleId} 權限異常`, err)
				);
			}
		},
		[crud.itemData?.UID, httpPatchAsync, selectedDept?.DeptID, token]
	);

	const handlePatch = useCallback(
		async ({ rowIndex, rowData }) => {
			const ogRowData = authGrid.gridData[rowIndex];
			console.log(`OG [${rowIndex}]`, ogRowData);

			console.log(`PATCH [${rowIndex}]`, rowData);
			const moduleId = rowData["JobID"];
			ZA03.FUNCTIONS.forEach((x) => {
				const enabledValue = rowData[x];
				if (enabledValue !== ogRowData[x]) {
					// const enabled = enabledValue === "1";
					// console.log(`PATCH [${moduleId}][${x}]=>`, enabled);
					// handleFunctionEnabled(moduleId, x, enabled);
					console.log(`PATCH [${moduleId}][${x}]=>`, enabledValue);
					handleFunctionEnabled(moduleId, x, enabledValue);
				}
			});
		},
		[authGrid.gridData, handleFunctionEnabled]
	);

	const handleAuthGridChange = useCallback(
		(newValue, operations) => {
			const operation = operations[0];
			console.log("operation", operation);
			// console.log("newValue", newValue);

			// if (operation.type === "UPDATE") {
			// const rowIndex = operation.fromRowIndex;
			// const rowData = newValue[rowIndex];
			// const row = { rowIndex, rowData };
			// const oldJobId = authGrid.gridData[rowIndex]["JobID"];
			// const newJobId = rowData["JobID"];
			// console.log(`${oldJobId} -> ${newJobId}`);
			// if (
			// 	rowData.module &&
			// 	authGrid.isDuplicating(rowData, newValue)
			// ) {
			// 	authGrid.rewriteRowValue(row, newValue, {
			// 		dept: null,
			// 	});
			// 	toast.error(
			// 		`「${rowData.prod?.ProdData}」已存在, 請選擇其他功能`
			// 	);
			// 	return;
			// }
			// }
			authGrid.propagateGridChange(newValue, operations);
		},
		[authGrid]
	);

	// const handleModuleSelectionChange = useCallback(
	// 	({ selection } = {}) => {
	// 		console.log("handleModuleSelectionChange", selection);
	// 		if (selection) {
	// 			const selectedModuleMin = getRowDataByIndex(selection.min.row);
	// 			const selectedModuleMax = getRowDataByIndex(selection.max.row);
	// 			setSelection({
	// 				selectedModuleMin,
	// 				selectedModuleMax,
	// 			});
	// 		}
	// 	},
	// 	[getRowDataByIndex]
	// );

	const handleCreateRow = useCallback(
		() => ({
			module: null,
			JobID: "",
			INQ: "0",
			INS: "0",
			UPD: "0",
			PRT: "0",
			DEL: "0",
			USI: "0",
			CHK: "0",
			NCK: "0",
			RUN: "0",
			EXP: "0",
			IMP: "0",
		}),
		[]
	);

	const isKeyDisabled = useCallback(
		({ rowData, rowIndex }) => {
			return (
				authGrid.readOnly || authGrid.isPersisted({ rowData, rowIndex })
			);
		},
		[authGrid]
	);

	const getOptionLabel = useCallback((option) => {
		return ZA03.getOptionLabel(option);
	}, []);

	const isOptionEqualToValue = (option, value) => {
		return ZA03.isOptionEqualToValue(option, value);
	};

	const getData = useCallback((data) => {
		return data;
	}, []);

	// 新增權限
	const addAuthAction = useAction();

	const onAddAuthSubmit = useCallback(
		async (data) => {
			console.log("onAddAuthSubmit", data);
			addAuthAction.start();

			let newSeq = authGrid.selectedRow?.rowData?.Seq || 0;
			if (data.position === 0) {
				newSeq -= 0.5;
			} else {
				newSeq += 0.5;
			}

			try {
				const { status, error } = await httpPostAsync({
					url: `v1/ou/user/authorities`,
					params: {
						uid: crud.itemData?.UID,
						ps: newSeq,
					},
					data: ZA03.transformModulesToIds(data.modules),
					bearer: token,
				});
				if (status?.success) {
					addAuthAction.finish();
					reloadUserAuthorities();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				addAuthAction.fail(err);
				toast.error(Errors.getMessage("新增權限失敗", err));
			}
		},
		[
			addAuthAction,
			authGrid.selectedRow?.rowData?.Seq,
			httpPostAsync,
			crud.itemData?.UID,
			token,
			reloadUserAuthorities,
		]
	);

	const onAddAuthSubmitError = useCallback(
		(err) => {
			console.error("onAddAuthSubmitError", err);
			addAuthAction.fail();
		},
		[addAuthAction]
	);

	const addAuthDialogOpen = useMemo(() => {
		return (
			addAuthAction.prompting ||
			addAuthAction.working ||
			addAuthAction.failed
		);
	}, [addAuthAction.failed, addAuthAction.prompting, addAuthAction.working]);

	const addAuthWorking = useMemo(() => {
		return addAuthAction.working;
	}, [addAuthAction.working]);

	//複製權限
	const copyAuthAction = useAction();
	const onCopyAuthSubmit = useCallback(
		async (data) => {
			console.log("onCopyAuthSubmit", data);
			try {
				copyAuthAction.start();
				const { status, error } = await httpPutAsync({
					url: "v1/ou/user/copy-authorities",
					bearer: token,
					data: CopyAuth.transformForSubmit(data),
					params: {
						uid: crud.itemData?.UID,
					},
				});
				if (status?.success) {
					copyAuthAction.finish();
					toast.success("權限複製成功");
					// 若編輯中則需要重整
					if (crud.itemViewOpen) {
						reloadUserAuthorities();
						//info 頁也需要重整
						await loadItem({ id: crud.itemData?.UID });
					}
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				copyAuthAction.fail(err);
				toast.error(Errors.getMessage("複製權限失敗", err));
			}
		},
		[
			copyAuthAction,
			crud.itemData?.UID,
			crud.itemViewOpen,
			httpPutAsync,
			loadItem,
			reloadUserAuthorities,
			token,
		]
	);

	const onCopyAuthSubmitError = useCallback((err) => {
		console.error("onCopyAuthSubmitError", err);
	}, []);

	const copyAuthDialogOpen = useMemo(() => {
		return (
			copyAuthAction.prompting ||
			copyAuthAction.working ||
			copyAuthAction.failed
		);
	}, [
		copyAuthAction.failed,
		copyAuthAction.prompting,
		copyAuthAction.working,
	]);

	const copyAuthWorking = useMemo(() => {
		return copyAuthAction.working;
	}, [copyAuthAction.working]);

	// 刪除權限

	const handleDelAuth = useCallback(
		async (moduleId) => {
			console.log(`handleDelAuth`);
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/ou/user/authorities`,
					params: {
						uid: crud.itemData?.UID,
						md: moduleId,
					},
					bearer: token,
				});
				if (status?.success) {
					reloadUserAuthorities();
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("刪除權限失敗", err));
			} finally {
				dialogs.closeLatest();
			}
		},
		[
			crud.itemData?.UID,
			dialogs,
			httpDeleteAsync,
			reloadUserAuthorities,
			token,
		]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.log(`confirm DELETE`, rowData);
			authGrid.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要移除 ${rowData.JobID} 所有作業權限?`,
				onConfirm: () => {
					handleDelAuth(rowData.JobID);
				},
				onCancel: () => {
					authGrid.setDeletingRow(null);
					dialogs.closeLatest();
				},
			});
		},
		[authGrid, dialogs, handleDelAuth]
	);

	const confirmResetPword = useCallback(
		(e, item) => {
			e.stopPropagation();
			dialogs.confirm({
				message: `確定要重設 ${item.LoginName} 的密碼為預設值?`,
				onConfirm: async () => {
					try {
						const { status, error, payload } = await httpPatchAsync(
							{
								url: "v1/ou/user/pword-reset",
								bearer: token,
								data: {
									uid: item.UID,
								},
							}
						);
						if (status?.success) {
							toast.success(
								`${item.LoginName} 密碼已重設為「${payload.newPword}」`
							);
						} else {
							throw error || new Error("未預期例外");
						}
					} catch (err) {
						toast.error(Errors.getMessage("重設密碼失敗", err));
					}
				},
			});
		},
		[dialogs, httpPatchAsync, token]
	);

	const onRowSelectionChange = useCallback(
		(row) => {
			authGrid.setSelectedRow(row);
		},
		[authGrid]
	);

	const saveAuthAction = useAction();

	const handleAuthSave = useCallback(async () => {
		const dirtyData = authGrid.getDirtyData();
		console.log(`handleAuthSave`, dirtyData);
		try {
			saveAuthAction.start("儲存中...");
			const { status, error } = await httpPatchAsync({
				url: `v1/ou/user/authorities`,
				bearer: token,
				params: {
					uid: crud.itemData?.UID,
					dp: selectedDept?.DeptID,
				},
				data: ZA03.transformForSubmit(dirtyData),
			});

			if (status?.success) {
				saveAuthAction.finish();
				setAuthEditingMode(null);
				reloadUserAuthorities();
				toast.success("權限已更新");
			} else {
				throw error || new Error("權限異動異常");
			}
		} catch (err) {
			saveAuthAction.fail("儲存失敗");
			toast.error(
				Errors.getMessage(
					`更新 ${crud.itemData?.LoginName} 權限發生錯誤`,
					err
				)
			);
		} finally {
			saveAuthAction.clear();
		}
	}, [
		authGrid,
		crud.itemData?.LoginName,
		crud.itemData?.UID,
		httpPatchAsync,
		reloadUserAuthorities,
		saveAuthAction,
		selectedDept?.DeptID,
		token,
	]);

	const onAuthSubmit = useCallback((data) => {
		console.log("onAuthSubmit", data);
	}, []);

	const onAuthSubmitError = useCallback((err) => {
		console.error("onAuthSubmitError", err);
	}, []);

	const promptCopyAuth = useCallback(
		(e, data) => {
			e?.stopPropagation();
			copyAuthAction.prompt();
			if (data) {
				crud.setItemData(data);
			}
		},
		[copyAuthAction, crud]
	);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...loader,
		...crud,
		handleSelect,
		// prepaerCreate,
		onSearchSubmit,
		onSearchSubmitError,

		onEditorSubmit,
		onEditorSubmitError,
		// CRUD overrides
		promptCreating,
		confirmDelete,
		...appModule,
		// Dialog
		confirmQuitCreating,
		confirmQuitUpdating,
		handleDialogClose,
		confirmReturnReading,
		// TAB
		selectedTab,
		setSelectedTab,
		handleTabChange,
		// Auth Grid
		handleDeptChange,
		selectedDept,
		getRowKey,
		authGridLoading,
		...authGrid,
		loadUserAuthorities,
		handleAuthGridChange,
		handleCreateRow,
		handleConfirmDelete,
		isKeyDisabled,
		getOptionLabel,
		isOptionEqualToValue,
		getData,
		handlePatch,
		// 新增權限
		promptAddAuth: addAuthAction.prompt,
		cancelAddAuth: addAuthAction.clear,
		onAddAuthSubmit,
		onAddAuthSubmitError,
		addAuthDialogOpen,
		addAuthWorking,
		// 複製權限
		// promptCopyAuth: copyAuthAction.prompt,
		promptCopyAuth,
		copyAuthItemData: copyAuthAction.itemData,
		cancelCopyAuth: copyAuthAction.clear,
		onCopyAuthSubmit,
		onCopyAuthSubmitError,
		copyAuthDialogOpen,
		copyAuthWorking,
		// handleSelectionChange: handleModuleSelectionChange,
		confirmResetPword,
		onRowSelectionChange,
		// AuthGrid
		authEditingMode,
		setAuthEditingMode,
		authEditing,
		goAuthInstantEditing,
		goAuthBatchEditing,
		cancelAuthEditing,
		confirmCancelAuthEditing,

		onAuthSubmit,
		onAuthSubmitError,
		handleAuthSave,
		stopInstantEditing,
		clearLoadAuth,
		saveAuthState: saveAuthAction.state,
		// 複製權限
	};
};
