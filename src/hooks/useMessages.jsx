import { useCallback, useState } from "react";
import { useInfiniteLoader } from "../shared-hooks/useInfiniteLoader";
import { AuthContext } from "../contexts/auth/AuthContext";
import { useContext } from "react";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";
import { toastEx } from "@/helpers/toast-ex";

export const useMessages = () => {
	const auth = useContext(AuthContext);
	const appFrame = useContext(AppFrameContext);
	const loader = useInfiniteLoader({
		url: "v1/my/messages",
		bearer: auth.token,
		initialFetchSize: 50,
	});

	const handleGotoJob = useCallback(
		(payload) => {
			console.log("handleGotoJob", payload);
			const jobId = payload?.jobID || payload?.JobID;
			const targetId = payload?.id || payload?.ID;


			if (jobId) {
				const deptId = payload?.DeptID;
				const deptName = payload?.AbbrName;

				if (auth.operator?.CurDeptID !== deptId) {
					toastEx.error(`此作業屬於 ${deptName}，請切換門市後再進行操作`);
					return;
				}

				appFrame.selectJobById(jobId, {
					...(targetId && {
						target: targetId,
					}),
				});
			}
		},
		[appFrame, auth.operator?.CurDeptID]
	);

	return {
		...loader,
		handleGotoJob,
	};
};
