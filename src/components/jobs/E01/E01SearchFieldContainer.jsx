import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { E01Context } from "@/contexts/E01/E01Context";
import { useMemo } from "react";

export const E01SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const forms = useFormContext();

	const e01 = useContext(E01Context);

	const inputRef = useRef(null);

	const onSubmit = useMemo(() => {
		return forms.handleSubmit(
			e01.onSearchSubmit,
			e01.onSearchSubmitError
		)
	}, [e01.onSearchSubmit, e01.onSearchSubmitError, forms]);

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
			onSubmit={onSubmit}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="搜尋單號(ctrl+F12)"
					mobilePlaceholder="單號"
					// rightSquare
					// square
					borderRadius="8px"
					// width="30ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
				/>
			</div>
		</form >
	);
};
E01SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
E01SearchFieldContainer.displayName = "E01SearchFieldContainer";


