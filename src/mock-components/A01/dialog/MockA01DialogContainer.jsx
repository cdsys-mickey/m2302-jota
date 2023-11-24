import { useMemo } from "react";
import MockA01Dialog from "./MockA01Dialog";

import { MockProducts } from "@/mocks/mock-products";
import { FormProvider, useForm } from "react-hook-form";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";

export const MockA01DialogContainer = ({ ...rest }) => {
	const { dialogOpen, handleViewing, cancelAction, creating, editing } =
		useCrudZZ();
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
				<MockA01Dialog
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
