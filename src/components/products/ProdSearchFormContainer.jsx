import A01 from "@/modules/md-a01";
import React, { useCallback, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SearchForm from "@/shared-components/SearchForm";
import ProdSearchPopperContainer from "./ProdSearchPopperContainer";
import { useCrud } from "@/contexts/crud/useCrud";
import { useHotkeys } from "react-hotkeys-hook";
import useSearchField from "@/shared-hooks/useSearchField";
import { useProds } from "@/contexts/prods/useProds";
import { forwardRef } from "react";

export const ProdSearchFormContainer = forwardRef((props, ref) => {
	const { fieldName = "q", ...rest } = props;
	const forms = useForm();
	const prods = useProds();
	const crud = useCrud();

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
					placeholder="以代碼或名稱搜尋貨品 (ctrl+F12)"
					mobilePlaceholder="編號/品名"
					// rightSquare
					// square
					borderRadius="8px"
					width="40ch"
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

ProdSearchFormContainer.displayName = "ProdSearchFormContainer";
export default ProdSearchFormContainer;
