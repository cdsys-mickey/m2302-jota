import { D06Context } from "@/contexts/D06/D06Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import D06SearchPopperContainer from "./D06SearchPopperContainer";
import D06 from "@/modules/md-d06";

export const D06SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const d06 = useContext(D06Context);

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
				d06.onSearchSubmit,
				d06.onSearchSubmitError
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
					width="100%"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					PopperComponent={D06SearchPopperContainer}
					popperOpen={d06.popperOpen}
					onPopperToggle={d06.handlePopperToggle}
					onPopperOpen={d06.handlePopperOpen}
					onPopperClose={d06.handlePopperClose}
					filtered={D06.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
D06SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
D06SearchFieldContainer.displayName = "D06SearchFieldContainer";



