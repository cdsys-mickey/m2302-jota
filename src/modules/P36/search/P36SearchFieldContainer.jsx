import { P36Context } from "@/modules/P36/P36Context";

import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P36SearchPopperContainer from "./P36SearchPopperContainer";
import P36 from "../P36.mjs";

export const P36SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const p36 = useContext(P36Context);

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
			p36.onSearchSubmit,
			p36.onSearchSubmitError
		)
	}, [p36.onSearchSubmit, p36.onSearchSubmitError, form])

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
					// PopperComponent={P36SearchPopperContainer}
					popperOpen={p36.popperOpen}
					onPopperToggle={p36.handlePopperToggle}
					onPopperOpen={p36.handlePopperOpen}
					onPopperClose={p36.handlePopperClose}
					filtered={P36.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
P36SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
P36SearchFieldContainer.displayName = "SupplierSearchFieldContainer";



