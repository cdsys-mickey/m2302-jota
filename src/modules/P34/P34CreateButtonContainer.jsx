import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { P34Context } from "./P34Context";

const P34CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const p34 = useContext(P34Context);
		const { moduleAuthorityLoading, canCreate } = p34;
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
				onClick={p34.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
P34CreateButtonContainer.displayName = "P34CreateButtonContainer";
export default P34CreateButtonContainer;

