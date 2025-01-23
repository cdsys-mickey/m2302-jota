import { C01Context } from "@/contexts/C01/C01Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import C01SearchPopperContainer from "./C01SearchPopperContainer";
import C01 from "@/modules/md-c01";

export const C01SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const c01 = useContext(C01Context);

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
				c01.onSearchSubmit,
				c01.onSearchSubmitError
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
					PopperComponent={C01SearchPopperContainer}
					popperOpen={c01.popperOpen}
					onPopperToggle={c01.handlePopperToggle}
					onPopperOpen={c01.handlePopperOpen}
					onPopperClose={c01.handlePopperClose}
					filtered={C01.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
C01SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
C01SearchFieldContainer.displayName = "C01SearchFieldContainer";


