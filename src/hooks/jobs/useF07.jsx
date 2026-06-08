import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "shared-components/toast-ex";
import F07 from "@/modules/md-f07";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useAction from "@/shared-modules/ActionState/useAction";
import { Box } from "@mui/material";

export const useF07 = () => {
	const crud = useContext(CrudContext);
	const { token } = useContext(AuthContext);
	const { httpGetAsync, httpPostAsync } = useWebApiAsync();
	const dialogs = useContext(DialogsContext);
	const appModule = useAppModule({
		token,
		moduleId: "F07",
	});

	const formMeta = useFormMeta(
		`
		
		`,
	);

	// READ
	const load = useCallback(
		async ({ refresh = false } = {}) => {
			try {
				if (!refresh) {
					crud.startLoading("讀取中...");
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/inv/taking/carry-forward",
					bearer: token,
				});
				if (status.success) {
					const data = F07.transformForReading(payload.data[0]);
					console.log("data", data);
					crud.finishedLoading({
						data: data,
					});
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedLoading(err);
			}
		},
		[crud, httpGetAsync, token],
	);

	const handleCarryForward = useCallback(
		async (data) => {
			console.log("handleCarryForward");
			try {
				crud.startUpdating();
				const { status, error } = await httpPostAsync({
					url: "v1/inv/taking/carry-forward",
					bearer: token,
					data: data,
				});
				if (status.success) {
					toastEx.success("庫存月結轉已完成");
					crud.finishedUpdating();
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedUpdating(err);
				console.error(err);
				toastEx.error("結轉失敗", err);
			} finally {
				crud.finishedUpdating();
				load();
			}
		},
		[crud, httpPostAsync, load, token],
	);

	const onSubmit = useCallback(
		(data) => {
			dialogs.confirm({
				message: (
					<span>
						確定將庫存月結轉到
						<Box
							component="span"
							pl={0.5}
							sx={{
								color: "error.main",
								fontWeight: 600,
							}}>
							{data.CutYM}
						</Box>
						?
					</span>
				),
				onConfirm: () => {
					handleCarryForward(data);
				},
			});
		},
		[dialogs, handleCarryForward],
	);

	const onSubmitError = useCallback((err) => {
		console.log("onSubmitError", err);
	}, []);

	const restoreAction = useAction();

	const handleRestore = useCallback(async (init = 0) => {
		console.log("handleRestore");
		try {
			restoreAction.start();
			const { status, error } = await httpPostAsync({
				url: "v1/inv/taking/restore",
				bearer: token,
				data: {
					init
				}
			});
			if (status.success) {
				toastEx.success("復原已完成");
				restoreAction.finish();
			} else {
				throw error ?? new Error("未預期例外");
			}
		} catch (err) {
			restoreAction.fail(err);
			console.error(err);
			toastEx.error("復原失敗", err);
		} finally {
			restoreAction.finish();
			load();
		}
	}, [httpPostAsync, load, restoreAction, token]);

	const confirmRestore = useCallback((init = 0) => {
		dialogs.confirm({
			message: <span>
				確定重整
				<Box
					component="span"
					pl={0.5}
					sx={{
						color: "error.main",
						fontWeight: 600,
					}}>
					{init == 1 ? "所有期數庫存" : "當期庫存"}
				</Box>
				?
			</span>,
			onConfirm: () => {
				handleRestore(init);
			},
		});
	}, [dialogs, handleRestore]);

	return {
		...appModule,
		...crud,
		onSubmit,
		onSubmitError,
		formMeta,
		load,
		// 復原
		confirmRestore,
		restoreWorking: restoreAction.working,
	};
};
