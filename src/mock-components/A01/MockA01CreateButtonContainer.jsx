import { useCrud } from "@/contexts/crud/useCrud";
import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import React, { forwardRef, memo } from "react";

export const MockA01CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const { handleCreating } = useCrud();

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={handleCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				新增
			</ResponsiveButton>
		);
	})
);