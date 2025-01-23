import { useCrudZZ } from "@/contexts/crud/useCrudZZ";
import A01 from "@/modules/md-a01";
import SearchForm from "@/shared-components/SearchForm";
import useSearchField from "@/shared-hooks/useSearchField";
import React, { forwardRef, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { useMockProds } from "../../contexts/prods/useMockProds";
import ProdSearchPopperContainer from "./MockProdSearchPopperContainer";

export const MockProdSearchFormContainer = forwardRef((props, ref) => {
	const { fieldName = "q", ...rest } = props;
	const forms = useForm();
	const prods = useMockProds();
	const crud = useCrudZZ();

	const inputRef = useRef(null);

	const handleSubmit = forms.handleSubmit(
		prods.onDefaultSubmit(forms),
		prods.onSubmitError
	);

	const filtered = useMemo(() => {
		return A01.isFiltered(prods.criteria);
	}, [prods.criteria]);

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			forms.setValue(fieldName, v);
		},
	});

	useHotkeys("ctrl+F12", searchField.handleFocus, { enableOnFormTags: true });
	const escRef = useHotkeys("esc", searchField.handleClear, {
		enableOnFormTags: true,
	});

	return (
		<div ref={escRef}>
			<FormProvider {...forms}>
				<SearchForm
					fieldName={fieldName}
					onSubmit={handleSubmit}
					placeholder="搜尋貨品 (ctrl+F12)"
					mobilePlaceholder="編號/品名"
					// rightSquare
					// square
					borderRadius="8px"
					maxWidth="32ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					PopperComponent={ProdSearchPopperContainer}
					popperOpen={crud.popperOpen}
					onPopperToggle={crud.handlePopperToggle}
					onPopperOpen={crud.handlePopperOpen}
					onPopperClose={crud.handlePopperClose}
				/>
			</FormProvider>
		</div>
	);
});

MockProdSearchFormContainer.displayName = "MockProdSearchFormContainer";
export default MockProdSearchFormContainer;
