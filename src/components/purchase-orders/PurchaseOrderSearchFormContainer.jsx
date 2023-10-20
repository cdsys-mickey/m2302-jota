import A01 from "@/mock-modules/md-a01";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SearchForm from "@/shared-components/SearchForm";
import PurchaseSearchPopperContainer from "./PurchaseSearchPopperContainer";
import { useCrud } from "@/contexts/crud/useCrud";
import { usePurchase } from "@/contexts/purchase/usePurchase";
import { forwardRef } from "react";
import useSearchField from "@/shared-hooks/useSearchField";
import { useHotkeys } from "react-hotkeys-hook";
import { useRef } from "react";

const PurchaseOrderSearchFormContainer = forwardRef((props, ref) => {
	const { fieldName = "q", ...rest } = props;
	const forms = useForm();
	const purchase = usePurchase();
	const crud = useCrud();

	const inputRef = useRef(null);

	const handleSubmit = forms.handleSubmit(
		purchase.onDefaultSubmit(forms),
		purchase.onSubmitError
	);

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			forms.setValue(fieldName, v);
		},
	});

	useHotkeys("ctrl+F12", searchField.handleFocus, {
		enableOnFormTags: true,
	});
	const escRef = useHotkeys("esc", searchField.handleClear, {
		enableOnFormTags: true,
	});

	return (
		<div ref={escRef}>
			<FormProvider {...forms}>
				<SearchForm
					fieldName={fieldName}
					onSubmit={handleSubmit}
					placeholder="以進貨單號或採購單號搜尋"
					mobilePlaceholder="進貨/採購單號"
					// rightSquare
					// square
					borderRadius="8px"
					width="40ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					PopperComponent={PurchaseSearchPopperContainer}
					popperOpen={crud.popperOpen}
					onPopperToggle={crud.handlePopperToggle}
					onPopperOpen={crud.handlePopperOpen}
					onPopperClose={crud.handlePopperClose}
				/>
			</FormProvider>
		</div>
	);
});

PurchaseOrderSearchFormContainer.displayName =
	"PurchaseOrderSearchFormContainer";
export default PurchaseOrderSearchFormContainer;
