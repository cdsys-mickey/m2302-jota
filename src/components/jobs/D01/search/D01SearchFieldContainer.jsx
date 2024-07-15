import { D01Context } from "@/contexts/D01/D01Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import D01SearchPopperContainer from "./D01SearchPopperContainer";
import D01 from "@/modules/md-d01";

export const D01SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const d01 = useContext(D01Context);

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
				d01.onSearchSubmit,
				d01.onSearchSubmitError
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
					PopperComponent={D01SearchPopperContainer}
					popperOpen={d01.popperOpen}
					onPopperToggle={d01.handlePopperToggle}
					onPopperOpen={d01.handlePopperOpen}
					onPopperClose={d01.handlePopperClose}
					filtered={D01.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
D01SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
D01SearchFieldContainer.displayName = "D01SearchFieldContainer";

