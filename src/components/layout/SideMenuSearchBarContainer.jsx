import useAppFrame from "@/shared-contexts/useAppFrame";
import useSearchField from "@/shared-hooks/useSearchField";
import { forwardRef, memo, useRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import SideMenuSearchBar from "@/shared-components/side-menu/SideMenuSearchBar";
import useSideMenu from "@/contexts/useSideMenu";
import useAppRedirect from "@/hooks/useAppRedirect";

const SideMenuSearchBarContainer = memo(
	forwardRef((props, ref) => {
		const { name, ...rest } = props;

		const inputRef = useRef(null);
		// const { onInputChange } = useSideMenu();

		// const { mobile } = useResponsive();
		const { setValue } = useFormContext();
		const { handleHomeClick } = useAppFrame();

		const searchField = useSearchField({
			inputRef,
			onChange: (v) => {
				setValue(name, v);
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
				<form>
					<SideMenuSearchBar
						ref={ref}
						inputRef={inputRef}
						// onToggleDrawerOpen={
						// 	mobile ? handleToggleDrawerOpen : undefined
						// }
						onClear={searchField.handleClear}
						// onSubmit={}
						name={name}
						onHomeClick={handleHomeClick}
						// onInputChange={onInputChange}
						// onClear={handleClear}
						{...rest}
					/>
				</form>
			</div>
		);
	})
);

export default SideMenuSearchBarContainer;
