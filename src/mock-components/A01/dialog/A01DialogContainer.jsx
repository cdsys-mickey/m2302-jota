import { useMemo } from "react";
import A01Dialog from "./A01Dialog";

import { MockProducts } from "@/mocks/mock-products";
import { FormProvider, useForm } from "react-hook-form";
import { useCrud } from "@/contexts/crud/useCrud";

export const A01DialogContainer = ({ ...rest }) => {
	const { dialogOpen, handleViewing, cancelAction, creating, editing } =
		useCrud();
	const forms = useForm();

	const title = useMemo(() => {
		if (editing) {
			return "編輯商品";
		}
		if (creating) {
			return "新增商品";
		}
		return "商品內容";
	}, [creating, editing]);
	return (
		<FormProvider {...forms}>
			<form>
				<A01Dialog
					title={title}
					open={dialogOpen}
					onClose={editing ? null : cancelAction}
					onReturn={editing ? handleViewing : null}
					// onCreate={handleCreate}
					data={MockProducts[0]}
					{...rest}
				/>
			</form>
		</FormProvider>
	);
};
