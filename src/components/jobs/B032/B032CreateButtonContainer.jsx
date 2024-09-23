import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { B032Context } from "@/contexts/B032/B032Context";

const B032CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b032 = useContext(B032Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={b032.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
B032CreateButtonContainer.displayName = "B032CreateButtonContainer";
export default B032CreateButtonContainer;



