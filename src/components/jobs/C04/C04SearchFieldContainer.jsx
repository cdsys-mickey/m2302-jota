import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { C04Context } from "@/contexts/C04/C04Context";
import C04 from "@/modules/md-c04";
import C04SearchPopperContainer from "./C04SearchPopperContainer";
import { useMemo } from "react";

export const C04SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;

	const c04 = useContext(C04Context);

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

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			c04.onSearchSubmit,
			c04.onSearchSubmitError
		)
	}, [c04.onSearchSubmit, c04.onSearchSubmitError, form])

	return (
		<form
			onSubmit={handleSubmit}>
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
					PopperComponent={C04SearchPopperContainer}
					popperOpen={c04.popperOpen}
					onPopperToggle={c04.handlePopperToggle}
					onPopperOpen={c04.handlePopperOpen}
					onPopperClose={c04.handlePopperClose}
					filtered={C04.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
C04SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
C04SearchFieldContainer.displayName = "C04SearchFieldContainer";
