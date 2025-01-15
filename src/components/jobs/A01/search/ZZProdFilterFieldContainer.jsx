import { A01Context } from "@/contexts/A01/A01Context";
import { SearchFieldContainer } from "@/shared-components/search-field/SearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import useDebounce from "../../../../shared-hooks/useDebounce";
import ProdSearchPopperContainer from "./A01SearchPopperContainer";

export const ZZProdFilterFieldContainer = (props) => {
	const { name = "q" } = props;
	const [value, onChange] = useState("");

	const a01 = useContext(A01Context);

	const inputRef = useRef(null);

	const searchField = useSearchField({
		inputRef,
		onChange,
	});

	useHotkeys("ctrl+F12", searchField.handleFocus, { enableOnFormTags: true });
	const escRef = useHotkeys("esc", searchField.handleClear, {
		enableOnFormTags: true,
	});

	// useEffect(() => {
	// 	a01.loadList({ qs: debouncedQs, reset: true });
	// }, [a01, debouncedQs]);

	return (
		<div ref={escRef}>
			<SearchFieldContainer
				name={name}
				placeholder="搜尋貨品 (ctrl+F12)"
				mobilePlaceholder="編號/品名"
				// rightSquare
				// square
				borderRadius="8px"
				width="30ch"
				responsive
				ref={inputRef}
				onClear={searchField.handleClear}
				// Popper
				PopperComponent={ProdSearchPopperContainer}
				popperOpen={a01.popperOpen}
				onPopperToggle={a01.handlePopperToggle}
				onPopperOpen={a01.handlePopperOpen}
				onPopperClose={a01.handlePopperClose}
			/>
		</div>
	);
};

ZZProdFilterFieldContainer.displayName = "ZZProdFilterFieldContainer";
ZZProdFilterFieldContainer.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};
