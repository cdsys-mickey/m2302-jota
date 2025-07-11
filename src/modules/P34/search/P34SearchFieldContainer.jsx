import { P34Context } from "@/modules/P34/P34Context";

import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P34SearchPopperContainer from "./P34SearchPopperContainer";
import P34 from "../P34.mjs";

export const P34SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const p34 = useContext(P34Context);

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
			p34.onSearchSubmit,
			p34.onSearchSubmitError
		)
	}, [p34.onSearchSubmit, p34.onSearchSubmitError, form])

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
					// PopperComponent={P34SearchPopperContainer}
					popperOpen={p34.popperOpen}
					onPopperToggle={p34.handlePopperToggle}
					onPopperOpen={p34.handlePopperOpen}
					onPopperClose={p34.handlePopperClose}
					filtered={P34.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
P34SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
P34SearchFieldContainer.displayName = "SupplierSearchFieldContainer";

