import { P41Context } from "@/modules/P41/P41Context";

import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P41SearchPopperContainer from "./P41SearchPopperContainer";
import P41 from "../P41.mjs";

export const P41SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const p41 = useContext(P41Context);

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
			p41.onSearchSubmit,
			p41.onSearchSubmitError
		)
	}, [p41.onSearchSubmit, p41.onSearchSubmitError, form])

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
					Popper
					PopperComponent={P41SearchPopperContainer}
					popperOpen={p41.popperOpen}
					onPopperToggle={p41.handlePopperToggle}
					onPopperOpen={p41.handlePopperOpen}
					onPopperClose={p41.handlePopperClose}
					filtered={P41.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
P41SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
P41SearchFieldContainer.displayName = "SupplierSearchFieldContainer";



