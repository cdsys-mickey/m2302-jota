import { D02Context } from "@/contexts/D02/D02Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import D02SearchPopperContainer from "./D02SearchPopperContainer";
import D02 from "@/modules/md-d02";

export const D02SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const d02 = useContext(D02Context);

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
				d02.onSearchSubmit,
				d02.onSearchSubmitError
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
					PopperComponent={D02SearchPopperContainer}
					popperOpen={d02.popperOpen}
					onPopperToggle={d02.handlePopperToggle}
					onPopperOpen={d02.handlePopperOpen}
					onPopperClose={d02.handlePopperClose}
					filtered={D02.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
D02SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
D02SearchFieldContainer.displayName = "D02SearchFieldContainer";


