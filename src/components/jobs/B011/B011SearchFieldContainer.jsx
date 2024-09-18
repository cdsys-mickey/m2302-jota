import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { B011Context } from "@/contexts/B011/B011Context";
import { useMemo } from "react";

export const B011SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const forms = useFormContext();

	const b011 = useContext(B011Context);

	const inputRef = useRef(null);

	const onSubmit = useMemo(() => {
		return forms.handleSubmit(
			b011.onSearchSubmit,
			b011.onSearchSubmitError
		)
	}, [b011.onSearchSubmit, b011.onSearchSubmitError, forms]);

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
B011SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
B011SearchFieldContainer.displayName = "B011SearchFieldContainer";

