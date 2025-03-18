import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import { toastEx } from "@/helpers/toastEx";
import { MockProducts } from "@/mocks/mock-products";
import A01 from "@/modules/A01.mjs";
import { useCallback, useState } from "react";
import { MockProdsContext } from "./MockProdsContext";

export const MockProdsProvider = ({ children }) => {
	const { cancelEditing, popperOpen, handlePopperClose } = useCrudZZ();
	const [state, setState] = useState({
		data: MockProducts,
	});

	const handleCreate = useCallback(() => {
		toastEx.success("已成功新增");
		cancelEditing();
	}, [cancelEditing]);

	const onDefaultSubmit = useCallback(
		({ setError }) =>
			(data) => {
				console.log(data, "onDefaultSubmit");
				if (!popperOpen) {
					if (data.qs) {
						fetch({
							criteria: A01.processForDefaultSubmit(data),
						});
					}
				} else {
					console.log(data, "onSearchSubmitEx");
					if (A01.hasEmptyError(data)) {
						setError("empty", {
							type: "custom",
							message: "必須至少選擇一個條件",
						});
						return;
					}

					const collected = A01.processForSubmit(data);
					console.log(collected, "collected");

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
