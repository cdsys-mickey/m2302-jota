import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { B04Context } from "@/contexts/B04/B04Context";
import { useMemo } from "react";

export const B04SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const forms = useFormContext();

	const b04 = useContext(B04Context);

	const inputRef = useRef(null);

	const onSubmit = useMemo(() => {
		return forms.handleSubmit(
			b04.onSearchSubmit,
			b04.onSearchSubmitError
		)
	}, [b04.onSearchSubmit, b04.onSearchSubmitError, forms]);

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
B04SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
B04SearchFieldContainer.displayName = "B04SearchFieldContainer";



