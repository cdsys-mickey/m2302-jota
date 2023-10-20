import React, { useCallback, useState } from "react";
import { PurchaseContext } from "./PurchaseContext";
import { useCrud } from "@/contexts/crud/useCrud";
import { MockPurchaseOrders } from "@/mocks/mock-purchase-orders";

export const PurchaseProvider = ({ children }) => {
	const { cancelEditing, popperOpen, handlePopperClose } = useCrud();
	const [state, setState] = useState({
		data: MockPurchaseOrders,
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

	return (
		<PurchaseContext.Provider
			value={{
				...state,
				handleCreate,
				onDefaultSubmit,
				onSubmitError,
			}}>
			{children}
		</PurchaseContext.Provider>
	);
};
