import { ControlledSearchFieldContainer } from "@/shared-components/search-field/ControlledSearchFieldContainer";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const UserSearchFieldContainer = (props) => {
	const { name = "qs", ...rest } = props;
	const forms = useFormContext();

	const users = useContext(ZA03Context);

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
				users.onSearchSubmit,
				users.onSearchSubmitError
			)}>
			<div ref={escRef}>
				<ControlledSearchFieldContainer
					autoFocus
					name={name}
					placeholder="搜尋帳號/姓名(ctrl+F12)"
					mobilePlaceholder="帳號/姓名"
					// rightSquare
					// square
					borderRadius="8px"
					// width="100%"
					responsive
					inputRef={inputRef}
					onClear={searchField.handleClear}
				// Popper
				// PopperComponent={UserSearchPopperContainer}
				// popperOpen={users.popperOpen}
				// onPopperToggle={users.handlePopperToggle}
				// onPopperOpen={users.handlePopperOpen}
				// onPopperClose={users.handlePopperClose}
				// filtered={Users.isFiltered(getValues())}
				/>
			</div>
		</form>
	);
};
UserSearchFieldContainer.propTypes = {
	name: PropTypes.string,
};
UserSearchFieldContainer.displayName = "UserSearchFieldContainer";
