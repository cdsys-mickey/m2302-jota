import { A20Context } from "@/contexts/A20/A20Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";

export const BomSearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const forms = useFormContext();
	// const { getValues } = forms;
	// const forms = useForm();

	const a20 = useContext(A20Context);

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
				a20.onSearchSubmit,
				a20.onSearchSubmitError
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
					// PopperComponent={BomSearchPopperContainer}
					// popperOpen={a20.popperOpen}
					// onPopperToggle={a20.handlePopperToggle}
					// onPopperOpen={a20.handlePopperOpen}
					// onPopperClose={a20.handlePopperClose}
					// filtered={A20.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
BomSearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
BomSearchFieldContainer.displayName = "BomSearchFieldContainer";
