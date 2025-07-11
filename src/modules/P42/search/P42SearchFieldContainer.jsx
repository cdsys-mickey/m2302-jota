import { P42Context } from "@/modules/P42/P42Context";

import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P42SearchPopperContainer from "./P42SearchPopperContainer";
import P42 from "../P42.mjs";

export const P42SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const p42 = useContext(P42Context);

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
			p42.onSearchSubmit,
			p42.onSearchSubmitError
		)
	}, [p42.onSearchSubmit, p42.onSearchSubmitError, form])

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
					placeholder="編號/名稱(ctrl+F12)"
					mobilePlaceholder="編號/名稱"
					// rightSquare
					// square
					borderRadius="8px"
					maxWidth="32ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					// PopperComponent={P42SearchPopperContainer}
					// popperOpen={p42.popperOpen}
					// onPopperToggle={p42.handlePopperToggle}
					// onPopperOpen={p42.handlePopperOpen}
					// onPopperClose={p42.handlePopperClose}
					filtered={P42.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
P42SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
P42SearchFieldContainer.displayName = "SupplierSearchFieldContainer";




