import { useEffect } from "react";
import PublicPageView from "./PublicPageView";
import PropTypes from "prop-types";

import { useWindowSize } from "@/shared-hooks/useWindowSize";

const PublicPageContainer = ({ title, ...rest }) => {
	const { height } = useWindowSize();

	useEffect(() => {
		document.title = title
			? `${import.meta.env.VITE_APP_TITLE} - ${title}`
			: import.meta.env.VITE_APP_TITLE;
	}, [title]);

	return <PublicPageView title={title} height={height} {...rest} />;
};

PublicPageContainer.propTypes = {
	title: PropTypes.string
}

export default PublicPageContainer;