import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B011Context } from "@/contexts/B011/B011Context";
import { B031Context } from "@/contexts/B031/B031Context";
import PropTypes from "prop-types";
import { BContext } from "@/contexts/B/BContext";

const B011CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { forNew = false, ...rest } = props;
		const b = useContext(BContext);
		const b011 = useContext(b.forNew ? B031Context : B011Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b011.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
B011CreateButtonContainer.displayName = "B011CreateButtonContainer";
B011CreateButtonContainer.propTypes = {
	forNew: PropTypes.bool
}
export default B011CreateButtonContainer;

