import { D041Context } from "@/contexts/D041/D041Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import D041SearchPopperContainer from "./D041SearchPopperContainer";
import D041 from "@/modules/D041.mjs";

export const D041SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const d041 = useContext(D041Context);

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
				d041.onSearchSubmit,
				d041.onSearchSubmitError
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
					maxWidth="32ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					PopperComponent={D041SearchPopperContainer}
					popperOpen={d041.popperOpen}
					onPopperToggle={d041.handlePopperToggle}
					onPopperOpen={d041.handlePopperOpen}
					onPopperClose={d041.handlePopperClose}
					filtered={D041.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
D041SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
D041SearchFieldContainer.displayName = "D041SearchFieldContainer";



