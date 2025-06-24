import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P21IDColumn from "./columns/P21IDColumn";
import P21NameColumn from "./columns/P21NameColumn";
import { useMemo } from "react";
import P21BankColumn from "./columns/P21BankColumn";

const P21ListRow = memo((props) => {
	const { index, style, value, onClick } = props;
	const { BankID, BankData_N } = value || {};

	const bank = useMemo(() => {
		return [BankID, BankData_N].filter(Boolean).join(" ");
	}, [BankData_N, BankID])

	return (
		<div style={style}>
			<HoverableListItem borderBottom onClick={onClick}>
				{/* <HoverableListItemSecondaryAction>
					<Tooltip arrow title="編輯">
						<IconButton>
							<EditOutlinedIcon htmlColor="#000" />
						</IconButton>
					</Tooltip>
				</HoverableListItemSecondaryAction> */}
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
					<P21IDColumn>{value?.FactID}</P21IDColumn>
					<P21NameColumn>
						{value?.FactData}
					</P21NameColumn>
					<P21BankColumn>
						{bank}
					</P21BankColumn>
					{/* <P21ClassNColumn loading={loading}>
						{value?.Clas_N}
					</P21ClassNColumn> */}
				</Grid>
			</HoverableListItem>
		</div>
	);
});

P21ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

P21ListRow.displayName = "P21ListRow";
export default P21ListRow;


