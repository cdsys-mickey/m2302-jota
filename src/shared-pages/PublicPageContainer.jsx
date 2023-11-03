import { useEffect } from "react";
import PublicPage from "./PublicPage";

import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const PublicPageContainer = ({ title, ...rest }) => {
	const { height } = useWindowSize();

	useEffect(() => {
		document.title = title
			? `${import.meta.env.VITE_APP_TITLE} - ${title}`
			: import.meta.env.VITE_APP_TITLE;
	}, [title]);

	return <PublicPage title={title} height={height} {...rest} />;
};
