import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { A05Context } from "./A05Context";

const A05CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const a05 = useContext(A05Context);
		const { moduleAuthorityLoading, canCreate } = a05;
		const text = useMemo(() => {
			return "新增";
		}, []);

		if (moduleAuthorityLoading || !canCreate) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={a05.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
A05CreateButtonContainer.displayName = "A05CreateButtonContainer";
export default A05CreateButtonContainer;
