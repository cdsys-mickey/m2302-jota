import React, { useMemo } from "react";
import { MockProducts } from "@/mocks/mock-products";
import { FormProvider, useForm } from "react-hook-form";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import C04Dialog from "./ZZC04Dialog";

import { forwardRef } from "react";
import { MockPurchaseOrders } from "@/mocks/mock-purchase-orders";

const C04DialogContainer = forwardRef(({ ...rest }, ref) => {
	const { dialogOpen, handleViewing, cancelAction, creating, editing } =
		useCrudZZ();
	const forms = useForm();

	const title = useMemo(() => {
		if (editing) {
			return "編輯進貨單";
		}
		if (creating) {
			return "新增進貨單";
		}
		return "進貨單內容";
	}, [creating, editing]);
	return (
		<FormProvider {...forms}>
			<form>
				<C04Dialog
					ref={ref}
					title={title}
					open={dialogOpen}
					onClose={editing ? null : cancelAction}
					onReturn={editing ? handleViewing : null}
					// onCreate={handleCreate}
					data={MockPurchaseOrders[0]}
					{...rest}
				/>
			</form>
		</FormProvider>
	);
});

C04DialogContainer.displayName = "C04DialogContainer";
export default C04DialogContainer;
