import { A06Context } from "@/contexts/A06/A06Context";
import A06 from "@/modules/md-a06";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import A06SearchPopperContainer from "./A06SearchPopperContainer";

export const A06SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const forms = useFormContext();
	const { getValues } = forms;
	// const forms = useForm();

	const a06 = useContext(A06Context);
	const { popperOpen } = a06;

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
				a06.onSearchSubmit,
				a06.onSearchSubmitError
			)}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="編號/名稱(ctrl+F12)"
					mobilePlaceholder="編號/名稱"
					// rightSquare
					// square
					borderRadius="8px"
					width="30ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					PopperComponent={A06SearchPopperContainer}
					popperOpen={a06.popperOpen}
					onPopperToggle={a06.handlePopperToggle}
					onPopperOpen={a06.handlePopperOpen}
					onPopperClose={a06.handlePopperClose}
					filtered={A06.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
A06SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
A06SearchFieldContainer.displayName = "A06SearchFieldContainer";
