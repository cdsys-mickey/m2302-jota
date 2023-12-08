import { A01Context } from "@/contexts/a01/A01Context";
import useSearchField from "@/shared-hooks/useSearchField";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { ControlledSearchFieldContainer } from "../../../../shared-components/search-field/ControlledSearchFieldContainer";
import ProdSearchPopperContainer from "./ProdSearchPopperContainer";
import { useMemo } from "react";
import A01 from "../../../../modules/md-a01";
import { useCallback } from "react";

export const ProdSearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const forms = useFormContext();
	const { getValues } = forms;
	// const forms = useForm();

	const a01 = useContext(A01Context);
	const { popperOpen } = a01;

	const inputRef = useRef(null);

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			forms.setValue(name, v);
		},
	});
	useHotkeys("ctrl+F12", searchField.handleFocus, { enableOnFormTags: true });

	const handleClear = useCallback(() => {
		if (!popperOpen) {
			searchField.handleClear;
		}
	}, [popperOpen, searchField.handleClear]);

	const escRef = useHotkeys("esc", handleClear, {
		enableOnFormTags: true,
	});

	return (
		<form
			onSubmit={forms.handleSubmit(
				a01.onSearchSubmit,
				a01.onSearchSubmitError
			)}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="搜尋貨品 (ctrl+F12)"
					mobilePlaceholder="編號/品名"
					// rightSquare
					// square
					borderRadius="8px"
					width="30ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					PopperComponent={ProdSearchPopperContainer}
					popperOpen={a01.popperOpen}
					onPopperToggle={a01.handlePopperToggle}
					onPopperOpen={a01.handlePopperOpen}
					onPopperClose={a01.handlePopperClose}
					filtered={A01.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};

ProdSearchFieldContainer.displayName = "ProdSearchFieldContainer";
