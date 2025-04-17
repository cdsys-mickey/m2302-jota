import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
import ListColumn from "../ListColumn";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import CheckboxEx from "@/shared-components/checkbox/CheckboxEx";
import { Box } from "@mui/material";
import { useContext } from "react";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import { useMemo } from "react";
import { useCallback } from "react";

const CheckboxColumn = memo(
	forwardRef(({ index, sx = [], slotProps, checked, onChange, ...rest }, ref) => {

		const listLoader = useContext(InfiniteLoaderContext);
		const { setChecked } = listLoader;



		return (
			<ListColumn
				ref={ref}
				item
				xs={1}
				sx={[
					() => ({
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						// "&:hover .checkbox-wrapper": {
						// 	display: "flex",
						// },
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				{/* <Box className="checkbox-wrapper" style={{
					display: "none"
				}}> */}
				<CheckboxEx
					className="hover-to-show"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						...(slotProps?.checkbox?.noPadding && {
							padding: 0
						}),
						...(!checked && {
							display: "none"
						})
					}}
					{...slotProps?.checkbox}
					checked={checked}
					onChange={onChange}
				/>
				{/* </Box> */}
			</ListColumn>
		);
	})
);
CheckboxColumn.propTypes = {
	checked: PropTypes.bool,
	checkedMap: PropTypes.object,
	index: PropTypes.number,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	slotProps: PropTypes.object,
	onChange: PropTypes.func
};
export default CheckboxColumn;
