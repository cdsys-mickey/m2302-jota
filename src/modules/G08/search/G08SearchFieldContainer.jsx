import { G08Context } from "@/modules/G08/G08Context";
import G08 from "@/modules/md-g08";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import G08SearchPopperContainer from "./G08SearchPopperContainer";

export const G08SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const g08 = useContext(G08Context);

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
			g08.onSearchSubmit,
			g08.onSearchSubmitError
		)
	}, [g08.onSearchSubmit, g08.onSearchSubmitError, form])

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
				// PopperComponent={G08SearchPopperContainer}
				// popperOpen={g08.popperOpen}
				// onPopperToggle={g08.handlePopperToggle}
				// onPopperOpen={g08.handlePopperOpen}
				// onPopperClose={g08.handlePopperClose}
				// filtered={G08.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
G08SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
G08SearchFieldContainer.displayName = "SupplierSearchFieldContainer";


