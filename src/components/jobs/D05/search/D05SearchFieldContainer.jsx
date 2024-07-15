import { D05Context } from "@/contexts/D05/D05Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import D05SearchPopperContainer from "./D05SearchPopperContainer";
import D05 from "@/modules/md-d05";

export const D05SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const d05 = useContext(D05Context);

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

	return (
		<form
			onSubmit={form.handleSubmit(
				d05.onSearchSubmit,
				d05.onSearchSubmitError
			)}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="搜尋單號(ctrl+F12)"
					mobilePlaceholder="單號"
					// rightSquare
					// square
					borderRadius="8px"
					width="30ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					PopperComponent={D05SearchPopperContainer}
					popperOpen={d05.popperOpen}
					onPopperToggle={d05.handlePopperToggle}
					onPopperOpen={d05.handlePopperOpen}
					onPopperClose={d05.handlePopperClose}
					filtered={D05.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
D05SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
D05SearchFieldContainer.displayName = "D05SearchFieldContainer";

