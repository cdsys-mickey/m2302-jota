import { useCallback, useState } from "react";
import { useInfiniteLoader } from "../shared-hooks/useInfiniteLoader";
import { AuthContext } from "../contexts/auth/AuthContext";
import { useContext } from "react";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";

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
				appFrame.selectJobById(jobId, {
					...(targetId && {
						id: targetId,
					}),
				});
			}
		},
		[appFrame]
	);

	return {
		...loader,
		handleGotoJob,
	};
};
