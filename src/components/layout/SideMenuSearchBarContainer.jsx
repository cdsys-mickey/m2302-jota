import SideMenuSearchBar from "@/shared-components/side-menu/SideMenuSearchBar";
import useSearchField from "@/shared-hooks/useSearchField";
import { forwardRef, memo, useContext, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";

const SideMenuSearchBarContainer = memo(
	forwardRef((props, ref) => {
		const { name, ...rest } = props;

		const inputRef = useRef(null);
		// const { onInputChange } = useSideMenu();

		// const { mobile } = useResponsive();
		const { setValue } = useFormContext();
		const { handleHomeClick } = useContext(AppFrameContext);

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
