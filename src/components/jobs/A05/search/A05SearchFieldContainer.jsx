import { A05Context } from "@/contexts/A05/A05Context";
import A05 from "@/modules/md-a05";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import A05SearchPopperContainer from "./A05SearchPopperContainer";

export const A05SearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const form = useFormContext();
	const { getValues } = form;
	const a05 = useContext(A05Context);

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
			a05.onSearchSubmit,
			a05.onSearchSubmitError
		)
	}, [a05.onSearchSubmit, a05.onSearchSubmitError, form])

	return (
		<form
			onSubmit={handleSubmit}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="編號/名稱(ctrl+F12)"
					mobilePlaceholder="編號/名稱"
					// rightSquare
					// square
					borderRadius="8px"
					width="100%"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					Popper
					PopperComponent={A05SearchPopperContainer}
					popperOpen={a05.popperOpen}
					onPopperToggle={a05.handlePopperToggle}
					onPopperOpen={a05.handlePopperOpen}
					onPopperClose={a05.handlePopperClose}
					filtered={A05.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
A05SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
A05SearchFieldContainer.displayName = "SupplierSearchFieldContainer";
