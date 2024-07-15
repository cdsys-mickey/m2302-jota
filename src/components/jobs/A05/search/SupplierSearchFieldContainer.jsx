import { A05Context } from "@/contexts/A05/A05Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";

export const SupplierSearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const forms = useFormContext();

	const a05 = useContext(A05Context);

	const inputRef = useRef(null);

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			forms.setValue(name, v);
		},
	});
	useHotkeys("ctrl+F12", searchField.handleFocus, { enableOnFormTags: true });

	const escRef = useHotkeys("esc", searchField.handleClear, {
		enableOnFormTags: true,
	});

	return (
		<form
			onSubmit={forms.handleSubmit(
				a05.onSearchSubmit,
				a05.onSearchSubmitError
			)}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="搜尋編號/名稱(ctrl+F12)"
					mobilePlaceholder="編號/名稱"
					// rightSquare
					// square
					borderRadius="8px"
					// width="30ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					// PopperComponent={SupplierSearchPopperContainer}
					// popperOpen={a05.popperOpen}
					// onPopperToggle={a05.handlePopperToggle}
					// onPopperOpen={a05.handlePopperOpen}
					// onPopperClose={a05.handlePopperClose}
					// filtered={A05.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
SupplierSearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
SupplierSearchFieldContainer.displayName = "SupplierSearchFieldContainer";
