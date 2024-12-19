import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import E01CustomerColumn from "./columns/E01CustomerColumn";
import E01DateColumn from "./columns/E01DateColumn";
import E01FlagColumn from "./columns/E01FlagColumn";
import E01IdColumn from "./columns/E01IdColumn";
import E01UserColumn from "./columns/E01UserColumn";

const E01ListRow = memo((props) => {
	const { index, style, value, onClick } = props;

	const customer = useMemo(() => {
		const { 客戶代碼, 客戶簡稱 } = value || "";
		return [客戶代碼, 客戶簡稱].filter(Boolean).join(" ");
	}, [value])

	const prod = useMemo(() => {
		const { ProdID, ProdData_N, PackData_N } = value || "";
		return [
			// ProdID, 
			ProdData_N]
			.filter(Boolean).join(" ").concat(PackData_N ? `(${PackData_N})` : "");
	}, [value])

	const employee = useMemo(() => {
		const { QEmplID, EmplData_N } = value || "";
		return [
			EmplData_N
		].filter(Boolean).join(" ");
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
						<E01IdColumn>
							{value?.訂貨單號 || ""}
						</E01IdColumn>
						<E01FlagColumn>
							{value?.結清 || ""}
						</E01FlagColumn>
						<E01DateColumn >
							{value?.訂貨日期 || ""}
						</E01DateColumn>

						<E01FlagColumn>
							{value?.零售 || ""}
						</E01FlagColumn>
						<E01CustomerColumn>
							{customer}
						</E01CustomerColumn>
						<E01UserColumn>
							{value?.業務人員 || ""}
						</E01UserColumn>
					</Grid>
				</Box>
			</HoverableListItem>
		</div>
	);
});

E01ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
	confirmResetPword: PropTypes.func,
	promptCopyAuth: PropTypes.func,
};

E01ListRow.displayName = "E01ListRow";
export default E01ListRow;


