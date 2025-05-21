import { A16Context } from "@/modules/A16/A16Context";
import A16 from "@/modules/md-a16";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import A16SearchPopperContainer from "./A16SearchPopperContainer";

export const A16SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const a16 = useContext(A16Context);

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
			a16.onSearchSubmit,
			a16.onSearchSubmitError
		)
	}, [a16.onSearchSubmit, a16.onSearchSubmitError, form])

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
				// PopperComponent={A16SearchPopperContainer}
				// popperOpen={a16.popperOpen}
				// onPopperToggle={a16.handlePopperToggle}
				// onPopperOpen={a16.handlePopperOpen}
				// onPopperClose={a16.handlePopperClose}
				// filtered={A16.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
A16SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
A16SearchFieldContainer.displayName = "SupplierSearchFieldContainer";

