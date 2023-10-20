import React, { useCallback, useRef } from "react";
import SideMenuSearchBar from "./SideMenuSearchBar";
import useProtectedLayout from "@/shared-contexts/useProtectedLayout";
import { FormProvider, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import useSearchField from "@/shared-hooks/useSearchField";

export const SideMenuSearchBarContainer = React.forwardRef((props, ref) => {
	const forms = useForm();
	const inputRef = useRef(null);
	const { name, ...rest } = props;
	const protectedPage = useProtectedLayout();

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			forms.setValue(name, v);
		},
	});

	useHotkeys("ctrl+F9", searchField.handleFocus, { enableOnFormTags: true });
	const escRef = useHotkeys("esc", searchField.handleClear, {
		enableOnFormTags: true,
	});

	return (
		<div ref={escRef}>
			<FormProvider {...forms}>
				<form>
					<SideMenuSearchBar
						ref={ref}
						inputRef={inputRef}
						onToggleDrawerOpen={
							protectedPage.handleToggleDrawerOpen
						}
						// onClear={searchField.handleClear}
						name={name}
						// onClear={handleClear}
						{...rest}
					/>
				</form>
			</FormProvider>
		</div>
	);
});
