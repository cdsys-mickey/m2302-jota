import HoverableListItem from "@/shared-components/HoverableListItem";
import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import P41IDColumn from "./columns/P41IDColumn";
import P41NameColumn from "./columns/P41NameColumn";
import { useMemo } from "react";
import P41BankColumn from "./columns/P41BankColumn";

const P41ListRow = memo((props) => {
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
					<P41IDColumn>{value?.FactID}</P41IDColumn>
					<P41NameColumn>
						{value?.FactData}
					</P41NameColumn>
					<P41BankColumn>
						{bank}
					</P41BankColumn>
					{/* <P41ClassNColumn loading={loading}>
						{value?.Clas_N}
					</P41ClassNColumn> */}
				</Grid>
			</HoverableListItem>
		</div>
	);
});

P41ListRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	value: PropTypes.object,
	loading: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	onClick: PropTypes.func,
};

P41ListRow.displayName = "P41ListRow";
export default P41ListRow;



