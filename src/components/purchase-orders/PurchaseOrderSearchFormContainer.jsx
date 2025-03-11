import A01 from "@/modules/A01.mjs";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PurchaseSearchPopperContainer from "./PurchaseSearchPopperContainer";
import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import { usePurchase } from "@/contexts/purchase/usePurchase";
import { forwardRef } from "react";
import useSearchField from "@/shared-hooks/useSearchField";
import { useHotkeys } from "react-hotkeys-hook";
import { useRef } from "react";
import SearchField from "../../shared-components/search-field/SearchField";

const PurchaseOrderSearchFormContainer = forwardRef((props, ref) => {
	const { fieldName = "q", ...rest } = props;
	const forms = useForm();
	const purchase = usePurchase();
	const crud = useCrudZZ();

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
				<SearchField
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
