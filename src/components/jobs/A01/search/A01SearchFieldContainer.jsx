import { A01Context } from "@/contexts/A01/A01Context";
import A01 from "@/modules/A01.mjs";
import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useCallback, useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import A01SearchPopperContainer from "./A01SearchPopperContainer";
import { useMemo } from "react";
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";

export const A01SearchFieldContainer = (props) => {
	const { name = "qs" } = props;
	const form = useFormContext();
	const { getValues } = form;

	const a01 = useContext(A01Context);
	const { mobile } = useContext(ResponsiveContext);
	const { popperOpen } = a01;

	const inputRef = useRef(null);

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			form.setValue(name, v);
		},
		// doubleFocusToClear: true,
	});
	useHotkeys("ctrl+F12", searchField.handleFocus, { enableOnFormTags: true });

	const handleClear = useCallback(() => {
		if (!popperOpen) {
			searchField.handleClear();
		}
	}, [popperOpen, searchField]);

	const escRef = useHotkeys("esc", handleClear, {
		enableOnFormTags: true,
	});

	// const _width = useMemo(() => {
	// 	return mobile ? "20ch" : "30ch";
	// }, [mobile])

	return (
		<form
			onSubmit={form.handleSubmit(
				a01.onSearchSubmit,
				a01.onSearchSubmitError
			)}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="編號/品名(ctrl+F12)"
					mobilePlaceholder="編號/品名"
					// rightSquare
					// square
					borderRadius="8px"
					maxWidth="32ch"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
					// Popper
					PopperComponent={A01SearchPopperContainer}
					popperOpen={a01.popperOpen}
					onPopperToggle={a01.handlePopperToggle}
					onPopperOpen={a01.handlePopperOpen}
					onPopperClose={a01.handlePopperClose}
					filtered={A01.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
A01SearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
A01SearchFieldContainer.displayName = "A01SearchFieldContainer";
