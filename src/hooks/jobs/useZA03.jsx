import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import UserInfo from "@/modules/md-user-info";
import ZA03 from "@/modules/md-za03";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useAction } from "@/shared-hooks/useAction";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ActionState from "@/shared-constants/action-state";
import { useAppModule } from "./useAppModule";
import { useInit } from "@/shared-hooks/useInit";
import { useRef } from "react";
import CopyAuth from "@/modules/md-copy-auth";
import Auth from "@/modules/md-auth";
import DSG from "../../shared-modules/sd-dsg";
import UserAuth from "../../modules/md-user-auth";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";

export const useZA03 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;

	const { token, operator } = useContext(AuthContext);

	const [selectedDept, setSelectedDept] = useState();
	const [selectedTab, setSelectedTab] = useState(ZA03.Tabs.INFO);

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
	const grid = useDSG({
		gridId: "auth",
		// keyColumn: "module.JobID",
		keyColumn: "JobID",
	});
	const gridMeta = useDSGMeta({

	});
	// const { clearGridData, getRowDataByIndex } = authGrid;

	// const [selection, setSelection] = useState({
	// 	selectedModuleMin: null,
	// 	selectedModuleMax: null,
	// });

	const [authGridEditingMode, setAuthEditingMode] = useState();
	const loadAuthGridAction = useAction();
	const { clear: clearLoadAuth } = loadAuthGridAction;

	const loadUserAuthorities = useCallback(
		async (opts = {}) => {
			console.log(`loadUserAuthorities`, opts);
			const {
				userId,
				deptId,
				all = false,
				supressLoading = false,
			} = opts;

			const activeUserId = userId || crud.itemData?.UID;
			const activeDeptId = deptId || selectedDept?.DeptID;

			if (!activeUserId || !activeDeptId) {
				console.log("userId and deptId are mandatory");
				return;
			}

			try {
				if (!supressLoading) {
					loadAuthGridAction.start();
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/ou/user/authorities",
					bearer: token,
					params: {
						uid: activeUserId,
						dp: activeDeptId,
						...(all && {
							edit: 1,
						}),
					},
				});
				if (status.success) {
					const data = payload.map((x) =>
						UserAuth.transformForReading(x)
					);
					grid.setGridData(data, {
						init: true,
					});
					loadAuthGridAction.finish();
				} else {
					throw error || new Error("讀取權限失敗");
				}
			} catch (err) {
				loadAuthGridAction.fail(err);
				toast.error(err?.message, {
					position: "top-center"
				});
			}
		},
		[
			grid,
			crud.itemData?.UID,
			httpGetAsync,
			loadAuthGridAction,
			selectedDept?.DeptID,
			token,
		]
	);

	const goAuthInstantEditing = useCallback(() => {
		setAuthEditingMode(UserAuth.AUTH_EDITING_MODE.CLICK);
	}, []);

	const goAuthBatchEditing = useCallback(async () => {
		setAuthEditingMode(UserAuth.AUTH_EDITING_MODE.SUBMIT);
		loadUserAuthorities({ all: true });
	}, [loadUserAuthorities]);

	const cancelAuthEditing = useCallback(() => {
		setAuthEditingMode(null);
		loadUserAuthorities({
			supressLoading: true,
		});
	}, [loadUserAuthorities]);

	const confirmCancelAuthEditing = useCallback(() => {
		if (!grid.isDirty) {
			cancelAuthEditing();
		} else {
			dialogs.confirm({
				message: `確定要放棄修改?`,
				onConfirm: () => {
					cancelAuthEditing();
				},
			});
		}
	}, [grid.isDirty, cancelAuthEditing, dialogs]);

	const stopInstantEditing = useCallback(() => {
		setAuthEditingMode(null);
	}, []);

	const authGridEditing = useMemo(() => {
		return !!authGridEditingMode;
	}, [authGridEditingMode]);

	const authGridLoading = useMemo(() => {
		return loadAuthGridAction.state === ActionState.WORKING;
	}, [loadAuthGridAction.state]);

	const handleDeptChange = useCallback(({ setValue, getValues }) => (newValue) => {
		// console.log("getValues", getValues());

		if (crud.creating) {
			if (newValue) {
				setValue("depts", [
					newValue
				])
			} else {
				setValue("depts", [

				])
			}
		}
	}, [crud.creating]);

	/**
	 * 防止隸屬門市被刪除
	 */
	const handleDeptsChange = useCallback(({ setValue, getValues }) => (newValue) => {
		// console.log("getValues", getValues());
		const dept = getValues("dept");

		if (!newValue.find(x => x.DeptID === dept.DeptID)) {
			return [
				dept,
				...newValue,
			]
		}
	}, []);


	const handleAuthDeptChange = useCallback(
		(dept) => {
			console.log("handleAuthDeptChange", dept);
			setSelectedDept(dept);
			if (itemData?.UID && dept?.DeptID) {
				// 載入 grid
				loadUserAuthorities({
					deptId: dept?.DeptID,
				});
			} else {
				grid.clearGridData();
			}
		},
		[grid, itemData?.UID, loadUserAuthorities]
	);

	const promptCreating = useCallback(async () => {
		crud.promptCreating({
			data: {
				LoginName: "",
				UserName: "",
				Tel: "",
				Cel: "",
				Email: "",
				userClass: Auth.findById(Auth.SCOPES.DEPT),
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
		async ({ id, refresh = false, dontSelectDefaultDept = false }) => {
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

				if (status.success) {
					const data = UserInfo.transformForReading(payload);
					crud.doneReading({
						data,
					});
					if (!dontSelectDefaultDept) {
						setSelectedDept(data.dept);
					}
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
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

	const confirmReturnReading = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

	const handleDialogClose = useCallback(() => {
		crud.cancelAction();
	}, [crud]);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		// return rowData?.module?.JobID || rowIndex;
		return `${rowData?.module?.JobID}-${rowData?.Seq}` || rowIndex;
	}, []);

	const handleCreate = useCallback(
		async (data) => {
			try {
				crud.startCreating();
				const { status, error, payload } = await httpPostAsync({
					url: "v1/ou/users",
					data: data,
					bearer: token,
				});

				if (status.success) {
					// const processed = Users.transformForReading(payload);
					toast.success(`使用者新增成功`);

					crud.doneCreating();
					await loadItem({ id: payload?.UID });
					// 重新整理
					loader.loadList({ refresh: true });
				} else {
					throw error || new Error("新增發生未預期例外");
				}
			} catch (err) {
				crud.failCreating(err);
				console.error("handleCreate.failed", err);
				if (err.code === 8) {
					toast.error("帳號名稱重複，請確認後重新送出",
						{
							position: "top-center",
						}
					);
				} else {
					toast.error(Errors.getMessage("新增失敗", err), {
						position: "top-center"
					});
				}
			}
		},
		[crud, httpPostAsync, loadItem, loader, token]
	);

	const handleUpdate = useCallback(
		async (payload) => {
			try {
				crud.startUpdating();
				const { status, error } = await httpPutAsync({
					url: `v1/ou/users`,
					data: payload,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`使用者 ${payload.data?.LoginName} ${payload.data?.UserName}」修改成功`
					);
					crud.doneUpdating();
					loadAuthGridAction.clear();
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
				toast.error(Errors.getMessage("修改失敗", err), {
					position: "top-center"
				});
			}
		},
		[crud, httpPutAsync, loadAuthGridAction, loadItem, loader, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log("onEditorSubmit", data);
			const processed = UserInfo.transformForEditorSubmit(data);
			console.log(`processed`, processed);
			if (crud.creating) {
				handleCreate(processed);
			} else if (crud.updating) {
				handleUpdate(processed);
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.creating, crud.updating, handleCreate, handleUpdate]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`ZA03.onSubmitError`, err);
		toast.error("資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出", {
			position: "top-center"
		});
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
					if (status.success) {
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
					toast.error(Errors.getMessage("刪除失敗", err), {
						position: "top-center"
					});
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
				newValue === ZA03.Tabs.AUTH &&
				loadAuthGridAction.state === null &&
				itemData?.UID &&
				selectedDept?.DeptID
			) {
				// 載入 grid
				loadUserAuthorities();
			}
		},
		[
			selectedDept?.DeptID,
			itemData?.UID,
			loadAuthGridAction.state,
			loadUserAuthorities,
		]
	);

	const handleFunctionEnabled = useCallback(
		async (moduleId, funcId, enabled) => {
			try {
				const { status, error } = await httpPatchAsync({
					url: `v1/ou/user/authorities/${enabled ? "enable" : "disable"
						}`,
					bearer: token,
					params: {
						uid: crud.itemData?.UID,
						md: moduleId,
						fn: funcId,
						dp: selectedDept?.DeptID,
					},
				});
				if (!status.success) {
					throw error || new Error("權限異動異常");
				}
			} catch (err) {
				toast.error(Errors.getMessage(`更新 ${moduleId} 權限異常`, err), {
					position: "top-center"
				});
			}
		},
		[crud.itemData?.UID, httpPatchAsync, selectedDept?.DeptID, token]
	);

	const handlePatch = useCallback(
		async ({ rowIndex, rowData }) => {
			const ogRowData = grid.gridData[rowIndex];
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
		[grid.gridData, handleFunctionEnabled]
	);

	// const handleGridChange = useCallback(
	// 	(newValue, operations) => {
	// 		let checkFailed = false;
	// 		const newGridData = [...newValue];
	// 		for (const operation of operations) {
	// 			if (operation.type === "UPDATE") {
	// 				newValue
	// 					.slice(operation.fromRowIndex, operation.toRowIndex)
	// 					.forEach(async (rowData, i) => {
	// 						const rowIndex = operation.fromRowIndex + i;
	// 						console.log(`DSG UPDATE[${rowIndex}]`);
	// 						const prevRowData = grid.prevGridData[rowIndex];

	// 						grid.handleDirtyCheck(rowData, prevRowData);
	// 					});
	// 			}
	// 		}
	// 		if (!checkFailed) {
	// 			grid.setGridData(newGridData);
	// 		}
	// 	},
	// 	[grid]
	// );

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
				grid.readOnly || grid.isPersisted({ rowData, rowIndex })
			);
		},
		[grid]
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

			let newSeq = grid.selectedRow?.rowData?.Seq || 0;
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
				if (status.success) {
					addAuthAction.finish();
					loadUserAuthorities();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				addAuthAction.fail(err);
				toast.error(Errors.getMessage("新增權限失敗", err), {
					position: "top-center"
				});
			}
		},
		[
			addAuthAction,
			grid.selectedRow?.rowData?.Seq,
			httpPostAsync,
			crud.itemData?.UID,
			token,
			loadUserAuthorities,
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
		async (payload) => {
			console.log("onCopyAuthSubmit", payload);
			const data = CopyAuth.transformForSubmitting(payload);
			console.log("transformed", data);
			try {
				copyAuthAction.start();
				const { status, error } = await httpPutAsync({
					url: "v1/ou/user/copy-authorities",
					bearer: token,
					data,
					params: {
						uid: crud.itemData?.UID,
						ad: selectedDept?.DeptID,
					},
				});
				if (status.success) {
					copyAuthAction.finish();
					toast.success("權限複製成功");
					// 若編輯中則需要重整
					if (crud.itemViewOpen) {
						loadUserAuthorities();
						//info 頁也需要重整
						await loadItem({
							id: crud.itemData?.UID,
							dontSelectDefaultDept: true,
						});
					}
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				copyAuthAction.fail(err);
				toast.error(Errors.getMessage("複製權限失敗", err), {
					position: "top-center"
				});
			}
		},
		[
			copyAuthAction,
			crud.itemData?.UID,
			crud.itemViewOpen,
			httpPutAsync,
			loadItem,
			loadUserAuthorities,
			selectedDept?.DeptID,
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
				if (status.success) {
					loadUserAuthorities();
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("刪除權限失敗", err), {
					position: "top-center"
				});
			} finally {
				dialogs.closeLatest();
			}
		},
		[
			crud.itemData?.UID,
			dialogs,
			httpDeleteAsync,
			loadUserAuthorities,
			token,
		]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.log(`confirm DELETE`, rowData);
			grid.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要移除 ${rowData.JobID} 所有作業權限?`,
				onConfirm: () => {
					handleDelAuth(rowData.JobID);
				},
				onCancel: () => {
					grid.setDeletingRow(null);
					dialogs.closeLatest();
				},
			});
		},
		[grid, dialogs, handleDelAuth]
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
						if (status.success) {
							toast.success(
								`${item.LoginName} 密碼已重設為「${payload.newPword}」`
							);
						} else {
							throw error || new Error("未預期例外");
						}
					} catch (err) {
						toast.error(Errors.getMessage("重設密碼失敗", err), {
							position: "top-center"
						});
					}
				},
			});
		},
		[dialogs, httpPatchAsync, token]
	);

	const onRowSelectionChange = useCallback(
		(row) => {
			grid.setSelectedRow(row);
		},
		[grid]
	);

	const funcDisabled = useCallback(({ rowData }) => {
		return !rowData.enabled;
	}, []);

	const saveAuthAction = useAction();

	const handleAuthSave = useCallback(async () => {
		const dirtyRows = grid.getDirtyRows();
		console.log(`handleAuthSave`, dirtyRows);
		// return;
		try {
			saveAuthAction.start("儲存中...");
			const { status, error } = await httpPatchAsync({
				url: `v1/ou/user/authorities`,
				bearer: token,
				params: {
					uid: crud.itemData?.UID,
					dp: selectedDept?.DeptID,
				},
				data: UserAuth.transformForSubmitting(dirtyRows),
			});

			if (status.success) {
				saveAuthAction.finish();
				setAuthEditingMode(null);
				loadUserAuthorities();
				toast.success("權限已更新");
			} else {
				throw error || new Error("權限異動異常");
			}
		} catch (err) {
			saveAuthAction.fail("儲存失敗");
			toast.error(Errors.getMessage(`更新 ${crud.itemData?.LoginName} 權限發生錯誤`, err), {
				position: "top-center"
			});
		} finally {
			saveAuthAction.clear();
		}
	}, [
		grid,
		crud.itemData?.LoginName,
		crud.itemData?.UID,
		httpPatchAsync,
		loadUserAuthorities,
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

	const getRowClassName = useCallback(({ rowData }) => {
		return rowData?.group ? DSG.CssClasses.GROUP_ROW : undefined;
	}, []);

	const setSelectionChecked = useCallback(
		(gridMeta, checked) => {
			const selection = gridMeta.getSelection({
				// debug: true 
			});
			console.log("selected", selection);

			grid.setGridData(
				(prev) =>
					prev.map((rowData, rowIndex) => {
						// 只更新指定行
						if (
							rowIndex >= selection.min.row &&
							rowIndex <= selection.max.row
						) {
							const updatedRowData = { ...rowData };
							for (
								let col = selection.min.col;
								col <= selection.max.col;
								col++
							) {
								if (Auth.isCheckboxColumn({ col })) {
									const functionKey =
										Auth.getFunctionKeyByIndex(col);
									updatedRowData[functionKey || "enabled"] =
										checked;
								}
							}
							return updatedRowData;
						}
						return rowData;
					}),
				{
					dirtyCheckByIndex: true,
					// debug: true 
				}
			);

			gridMeta.setSelection(selection);
		},
		[grid]
	);

	const checkSelection = useCallback(({ gridMeta }) => () => {
		setSelectionChecked(gridMeta, true);
	}, [setSelectionChecked]);

	const clearSelection = useCallback(({ gridMeta }) => () => {
		setSelectionChecked(gridMeta, false);
	}, [setSelectionChecked]);

	const checkAll = useCallback(() => {
		grid.setGridData(
			(prev) =>
				prev.map((rowData) => {
					const updatedRowData = { ...rowData, enabled: true };
					Object.keys(Auth.FUNCTIONS).forEach((key) => {
						updatedRowData[key] = true;
					});
					return updatedRowData;
				}),
			{ dirtyCheckByIndex: true, debug: true }
		);
	}, [grid]);

	const clearAll = useCallback(() => {
		grid.setGridData(
			(prev) =>
				prev.map((rowData) => {
					const updatedRowData = { ...rowData, enabled: false };
					Object.keys(Auth.FUNCTIONS).forEach((key) => {
						updatedRowData[key] = false;
					});
					return updatedRowData;
				}),
			{ dirtyCheckByIndex: true, debug: true }
		);
	}, [grid]);

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
		handleAuthDeptChange,
		selectedDept,
		getRowKey,
		authGridLoading,
		grid,
		...grid,
		loadUserAuthorities,
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
		// buildSelectionChangeHandler: handleModuleSelectionChange,
		confirmResetPword,
		onRowSelectionChange,
		// AuthGrid
		authGridEditingMode,
		setAuthEditingMode,
		authGridEditing,
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
		getRowClassName,
		// handleGridChange,
		funcDisabled,
		checkAll,
		clearAll,
		checkSelection,
		clearSelection,
		handleDeptChange,
		handleDeptsChange
	};
};
