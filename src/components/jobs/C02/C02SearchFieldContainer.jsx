import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { C02Context } from "@/contexts/C02/C02Context";

export const C02SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const forms = useFormContext();

	const c02 = useContext(C02Context);

	const inputRef = useRef(null);

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			forms.setValue(name, v);
		},
	});
	useHotkeys("ctrl+F12", searchField.handleFocus, { enableOnFormTags: true });

	const escRef = useHotkeys("esc", searchField.handleClear, {
		enableOnFormTags: true,
	});

	return (
		<form
			onSubmit={forms.handleSubmit(
				c02.onSearchSubmit,
				c02.onSearchSubmitError
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
					// width="100%"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
				/>
			</div>
		</form>
	);
};
C02SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
C02SearchFieldContainer.displayName = "C02SearchFieldContainer";
