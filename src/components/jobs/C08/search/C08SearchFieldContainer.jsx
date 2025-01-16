import { C08Context } from "@/contexts/C08/C08Context";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import C08SearchPopperContainer from "./C08SearchPopperContainer";
import C08 from "@/modules/md-c08";

export const C08SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();

	const c08 = useContext(C08Context);

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
				c08.onSearchSubmit,
				c08.onSearchSubmitError
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
					PopperComponent={C08SearchPopperContainer}
					popperOpen={c08.popperOpen}
					onPopperToggle={c08.handlePopperToggle}
					onPopperOpen={c08.handlePopperOpen}
					onPopperClose={c08.handlePopperClose}
					filtered={C08.isFiltered(form.getValues())}
				/>
			</div>
		</form>
	);
};
C08SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
C08SearchFieldContainer.displayName = "C08SearchFieldContainer";
