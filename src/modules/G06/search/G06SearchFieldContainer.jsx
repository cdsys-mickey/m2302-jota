import { G06Context } from "@/modules/G06/G06Context";

import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import G06SearchPopperContainer from "./G06SearchPopperContainer";
import G06 from "../G06.mjs";

export const G06SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const g06 = useContext(G06Context);

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
			g06.onSearchSubmit,
			g06.onSearchSubmitError
		)
	}, [g06.onSearchSubmit, g06.onSearchSubmitError, form])

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
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
					PopperComponent={G06SearchPopperContainer}
					popperOpen={g06.popperOpen}
					onPopperToggle={g06.handlePopperToggle}
					onPopperOpen={g06.handlePopperOpen}
					onPopperClose={g06.handlePopperClose}
					filtered={G06.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
G06SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
G06SearchFieldContainer.displayName = "SupplierSearchFieldContainer";

