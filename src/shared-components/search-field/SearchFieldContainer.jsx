import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { forwardRef, useContext } from "react";
import SearchField from "./SearchField";

export const SearchFieldContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const responsive = useContext(ResponsiveContext);
	return <SearchField ref={ref} mobile={responsive.mobule} {...rest} />;
});

SearchFieldContainer.displayName = "SearchFieldContainer";
