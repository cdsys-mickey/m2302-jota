import { C05Context } from "@/contexts/C05/C05Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import C05SearchPopperContainer from "./C05SearchPopperContainer";
import C05 from "@/modules/md-c05";

export const C05SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const c05 = useContext(C05Context);

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
				c05.onSearchSubmit,
				c05.onSearchSubmitError
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
					PopperComponent={C05SearchPopperContainer}
					popperOpen={c05.popperOpen}
					onPopperToggle={c05.handlePopperToggle}
					onPopperOpen={c05.handlePopperOpen}
					onPopperClose={c05.handlePopperClose}
					filtered={C05.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
C05SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
C05SearchFieldContainer.displayName = "C05SearchFieldContainer";
