import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { B032Context } from "@/contexts/B032/B032Context";
import { useMemo } from "react";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";

export const B032SearchFieldContainer = (props) => {
	const { name = "q", ...rest } = props;
	const forms = useFormContext();

	const b = useContext(BContext);
	const b032 = useContext(b.forNew ? B032Context : B012Context);

	const inputRef = useRef(null);

	const handleSubmit = useMemo(() => {
		return forms.handleSubmit(
			b032.onSearchSubmit,
			b032.onSearchSubmitError
		)
	}, [b032.onSearchSubmit, b032.onSearchSubmitError, forms]);

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
					// maxWidth="32ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
				/>
			</div>
		</form >
	);
};
B032SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
B032SearchFieldContainer.displayName = "B032SearchFieldContainer";



