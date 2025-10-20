import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { A16Context } from "./A16Context";
import { useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "../Auth.mjs";

const A16CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const { operator } = useContext(AuthContext);
		const a16 = useContext(A16Context);
		const { moduleAuthorityLoading, canCreate } = a16;
		const text = useMemo(() => {
			return "新增";
		}, []);

		if (moduleAuthorityLoading || !canCreate || operator.Class < Auth.SCOPES.ROOT) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				color="warning"
				startIcon={<AddIcon />}
				onClick={a16.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
A16CreateButtonContainer.displayName = "A16CreateButtonContainer";
export default A16CreateButtonContainer;

