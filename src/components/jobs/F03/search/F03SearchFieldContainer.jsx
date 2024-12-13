import { F03Context } from "@/contexts/F03/F03Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import F03SearchPopperContainer from "./F03SearchPopperContainer";
import F03 from "@/modules/md-f03";

export const F03SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const f03 = useContext(F03Context);

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
				f03.onSearchSubmit,
				f03.onSearchSubmitError
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
					// PopperComponent={F03SearchPopperContainer}
					popperOpen={f03.popperOpen}
					onPopperToggle={f03.handlePopperToggle}
					onPopperOpen={f03.handlePopperOpen}
					onPopperClose={f03.handlePopperClose}
					filtered={F03.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
F03SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
F03SearchFieldContainer.displayName = "F03SearchFieldContainer";





