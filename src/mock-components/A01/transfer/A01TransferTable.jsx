import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { FormFieldLabel } from "@/shared-components";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	styled,
} from "@mui/material";
import Strings from "@/shared-modules/sd-strings";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const A01TransferTable = memo(
	forwardRef((props, ref) => {
		const { data, ...rest } = props;

		if (!data || data.length === 0) {
			return <FormFieldLabel>(空白)</FormFieldLabel>;
		}

		return (
			<TableContainer ref={ref} component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>門市代號</TableCell>
							<TableCell>門市</TableCell>
							<TableCell>調撥成本</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.map((r) => (
							<StyledTableRow key={r.Shop.id}>
								<TableCell>{r.Shop.id}</TableCell>
								<TableCell>{r.Shop.name}</TableCell>
								<TableCell>
									{Strings.formatPrice(r.Cost)}
								</TableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	})
);

A01TransferTable.propTypes = {
	data: PropTypes.array,
};

A01TransferTable.displayName = "A01TransferTable";
export default A01TransferTable;
