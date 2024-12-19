import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import E03CustomerColumn from "./columns/E03CustomerColumn";
import E03DateColumn from "./columns/E03DateColumn";
import E03FlagColumn from "./columns/E03FlagColumn";
import E03IdColumn from "./columns/E03IdColumn";
import E03UserColumn from "./columns/E03UserColumn";

const E03ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

	const customer = useMemo(() => {
		const { 客戶代碼, 客戶簡稱 } = value || "";
		return [客戶代碼, 客戶簡稱].filter(Boolean).join(" ");
	}, [value])


	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				<Box>
					<Grid
						container
						columns={24}
						sx={[
							{
								minHeight: "36px",
								alignItems: "center",
							},
						]}>
						<IndexColumn title={index}></IndexColumn>
						<E03IdColumn>
							{value?.銷退單號 || ""}
						</E03IdColumn>
						<E03DateColumn >
							{value?.銷退日期 || ""}
						</E03DateColumn>
						<E03DateColumn >
							{value?.應收帳日期 || ""}
						</E03DateColumn>

						<E03FlagColumn>
							{value?.零售 || ""}
						</E03FlagColumn>
						<E03CustomerColumn>
							{customer}
						</E03CustomerColumn>
						<E03UserColumn>
							{value?.業務人員 || ""}
						</E03UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

E03ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

E03ListRow.displayName = "E03ListRow";
export default E03ListRow;




