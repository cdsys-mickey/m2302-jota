import useContainerSize from "@/shared-hooks/useContainerSize";
import ResponsiveLayoutProvider from "./ResponsiveLayoutProvider";
import PropTypes from "prop-types";

const ResponsiveLayout = (props) => {
	const { children, ...opts } = props;
	const { containerRef, ...containerOpts } = useContainerSize({
		...opts
	});
	return (
		<ResponsiveLayoutProvider containerRef={containerRef}  {...containerOpts} {...opts}>
			<div ref={containerRef}>
				{children}
			</div>
		</ResponsiveLayoutProvider>
	);
}

ResponsiveLayout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}

ResponsiveLayout.displayName = "ResponsiveLayout";
export default ResponsiveLayout;