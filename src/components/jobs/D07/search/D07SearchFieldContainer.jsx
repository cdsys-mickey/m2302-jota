import { D07Context } from "@/contexts/D07/D07Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import D07SearchPopperContainer from "./D07SearchPopperContainer";
import D07 from "@/modules/md-d07";

export const D07SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const d07 = useContext(D07Context);

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
				d07.onSearchSubmit,
				d07.onSearchSubmitError
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
					PopperComponent={D07SearchPopperContainer}
					popperOpen={d07.popperOpen}
					onPopperToggle={d07.handlePopperToggle}
					onPopperOpen={d07.handlePopperOpen}
					onPopperClose={d07.handlePopperClose}
					filtered={D07.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
D07SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
D07SearchFieldContainer.displayName = "D07SearchFieldContainer";




