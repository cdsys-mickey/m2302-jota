import { P21Context } from "@/modules/P21/P21Context";

import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P21SearchPopperContainer from "./P21SearchPopperContainer";
import P21 from "../P21.mjs";

export const P21SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const p21 = useContext(P21Context);

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
			p21.onSearchSubmit,
			p21.onSearchSubmitError
		)
	}, [p21.onSearchSubmit, p21.onSearchSubmitError, form])

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
					PopperComponent={P21SearchPopperContainer}
					popperOpen={p21.popperOpen}
					onPopperToggle={p21.handlePopperToggle}
					onPopperOpen={p21.handlePopperOpen}
					onPopperClose={p21.handlePopperClose}
					filtered={P21.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
P21SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
P21SearchFieldContainer.displayName = "SupplierSearchFieldContainer";


