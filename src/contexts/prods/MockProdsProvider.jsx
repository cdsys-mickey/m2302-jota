import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { MockProducts } from "@/mocks/mock-products";
import A01 from "@/modules/md-a01";
import { MockProdsContext } from "./MockProdsContext";

export const MockProdsProvider = ({ children }) => {
	const { cancelEditing, popperOpen, handlePopperClose } = useCrudZZ();

	const [state, setState] = useState({
		data: MockProducts,
	});

	const handleCreate = useCallback(() => {
		toast.success("已成功新增");
		cancelEditing();
	}, [cancelEditing]);

	const onDefaultSubmit = useCallback(
		({ setError }) =>
			(data) => {
				console.debug(data, "onDefaultSubmit");
				if (!popperOpen) {
					if (data.qs) {
						fetch({
							criteria: A01.processForDefaultSubmit(data),
						});
					}
				} else {
					console.debug(data, "onSearchSubmitEx");
					if (A01.hasEmptyError(data)) {
						setError("empty", {
							type: "custom",
							message: "必須至少選擇一個條件",
						});
						return;
					}

					const collected = A01.processForSubmit(data);
					console.debug(collected, "collected");

					handlePopperClose();
				}
			},
		[handlePopperClose, popperOpen]
	);

	const onSubmitError = useCallback((err) => {
		console.error(err);
	}, []);

	// POPPER

	return (
		<MockProdsContext.Provider
			value={{
				...state,

				handleCreate,
				onDefaultSubmit,
				onSubmitError,
			}}>
			{children}
		</MockProdsContext.Provider>
	);
};
