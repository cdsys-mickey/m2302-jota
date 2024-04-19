import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useAppFrame } from "../../shared-contexts/app-frame/useAppFrame";
import { useWebApi } from "../../shared-hooks/useWebApi";

export const useHome = () => {
	const { httpGetAsync } = useWebApi();
	const { token } = useContext(AuthContext);
	const appFrame = useAppFrame();
	const { selectJobById } = appFrame;
	const [reviewState, setReviewState] = useState({
		reviewData: null,
		reviewDataError: null,
		reviewLoading: null,
	});

	const getReview = useCallback(async () => {
		try {
			setReviewState((prev) => ({
				...prev,
				reviewLoading: true,
			}));
			const { status, payload, error } = await httpGetAsync({
				url: "v1/auth/review",
				bearer: token,
			});
			if (status.success) {
				setReviewState((prev) => ({
					...prev,
					reviewDataError: null,
					reviewData: payload,
				}));
			} else {
				throw error || new Error("取得待審核資訊時發生未預期例外");
			}
		} catch (err) {
			setReviewState((prev) => ({
				...prev,
				reviewDataError: err,
			}));
		} finally {
			setReviewState((prev) => ({
				...prev,
				reviewLoading: false,
			}));
		}
	}, [httpGetAsync, token]);

	const handleReviewItemClick = useCallback(
		(item) => {
			selectJobById(item.module);
		},
		[selectJobById]
	);

	return {
		...reviewState,
		getReview,
		handleReviewItemClick,
	};
};
