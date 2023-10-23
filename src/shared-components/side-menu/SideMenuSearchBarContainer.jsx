import useAppFrame from "@/shared-contexts/useAppFrame";
import useSearchField from "@/shared-hooks/useSearchField";
import { forwardRef, memo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import SideMenuSearchBar from "./SideMenuSearchBar";

const SideMenuSearchBarContainer = memo(
	forwardRef((props, ref) => {
		const forms = useForm();
		const inputRef = useRef(null);
		const { name, ...rest } = props;
		const { handleToggleDrawerOpen } = useAppFrame();

		const searchField = useSearchField({
			inputRef,
			onChange: (v) => {
				forms.setValue(name, v);
			},
		});

		useHotkeys("ctrl+F9", searchField.handleFocus, {
			enableOnFormTags: true,
		});
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
							onToggleDrawerOpen={handleToggleDrawerOpen}
							// onClear={searchField.handleClear}
							name={name}
							// onClear={handleClear}
							{...rest}
						/>
					</form>
				</FormProvider>
			</div>
		);
	})
);

export default SideMenuSearchBarContainer;
