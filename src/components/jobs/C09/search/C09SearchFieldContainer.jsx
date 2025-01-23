import { C09Context } from "@/contexts/C09/C09Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import C09SearchPopperContainer from "./C09SearchPopperContainer";
import C09 from "@/modules/md-c09";

export const C09SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const c09 = useContext(C09Context);

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
				c09.onSearchSubmit,
				c09.onSearchSubmitError
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
					PopperComponent={C09SearchPopperContainer}
					popperOpen={c09.popperOpen}
					onPopperToggle={c09.handlePopperToggle}
					onPopperOpen={c09.handlePopperOpen}
					onPopperClose={c09.handlePopperClose}
					filtered={C09.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
C09SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
C09SearchFieldContainer.displayName = "C09SearchFieldContainer";
