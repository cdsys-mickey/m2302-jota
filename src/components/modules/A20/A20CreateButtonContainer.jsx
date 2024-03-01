import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { A20Context } from "../../../contexts/A20/A20Context";

const A20CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const a20 = useContext(A20Context);
		const text = useMemo(() => {
			return "新增";
		}, []);

		if (a20.moduleAuthorityLoading || !a20.canCreate) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={a20.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
A20CreateButtonContainer.displayName = "A20CreateButtonContainer";
export default A20CreateButtonContainer;
