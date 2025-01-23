import { C07Context } from "@/contexts/C07/C07Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import C07SearchPopperContainer from "./C07SearchPopperContainer";
import C07 from "@/modules/md-c07";

export const C07SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const c07 = useContext(C07Context);

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
				c07.onSearchSubmit,
				c07.onSearchSubmitError
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
					PopperComponent={C07SearchPopperContainer}
					popperOpen={c07.popperOpen}
					onPopperToggle={c07.handlePopperToggle}
					onPopperOpen={c07.handlePopperOpen}
					onPopperClose={c07.handlePopperClose}
					filtered={C07.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
C07SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
C07SearchFieldContainer.displayName = "C07SearchFieldContainer";
