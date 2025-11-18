import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import ListColumn from "../ListColumn";

const IndexColumn = memo(
	forwardRef(({ children, sx = [], ...rest }, ref) => {
		return (
			<ListColumn
				ref={ref}
				item
				xs={1}
				sx={[
					{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						"& *": {
							color: "rgb(0 0 0 / 50%)",
						},
					},
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				{children}
			</ListColumn>
		);
	})
);
IndexColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default IndexColumn;
