import { P35Context } from "@/modules/P35/P35Context";

import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P35SearchPopperContainer from "./P35SearchPopperContainer";
import P35 from "../P35.mjs";

export const P35SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const p35 = useContext(P35Context);

	const inputRef = useRef(null);

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			form.setValue(name, v);
		},
	});
	useHotkeys("ctrl+F12", searchField.handleFocus, { enableOnFormTags: true });

	const escRef = useHotkeys("esc", searchField.handleClear, {
		enableOnFormTags: true,
	});

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p35.onSearchSubmit,
			p35.onSearchSubmitError
		)
	}, [p35.onSearchSubmit, p35.onSearchSubmitError, form])

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<form
			onSubmit={handleSubmit}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="簡碼/編號/名稱(C+F12)"
					mobilePlaceholder="編號/名稱"
					// rightSquare
					// square
					borderRadius="8px"
					maxWidth="32ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					Popper
					// PopperComponent={P35SearchPopperContainer}
					popperOpen={p35.popperOpen}
					onPopperToggle={p35.handlePopperToggle}
					onPopperOpen={p35.handlePopperOpen}
					onPopperClose={p35.handlePopperClose}
					filtered={P35.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
P35SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
P35SearchFieldContainer.displayName = "SupplierSearchFieldContainer";


