import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import {
	Box,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	styled,
} from "@mui/material";
import Strings from "@/modules/md-strings";
import FlexGrid from "@/shared-components/FlexGrid";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const C04OrderDetailTable = memo(
	forwardRef((props, ref) => {
		const { data, ...rest } = props;

		if (!data?.Items || data?.Items.length === 0) {
			return <FormFieldLabel>(空白)</FormFieldLabel>;
		}

		return (
			<div>
				<Box>
					<TableContainer ref={ref} component={Paper}>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>貨品編號</TableCell>
									<TableCell>品名規格/包裝說明</TableCell>
									<TableCell align="right">單價</TableCell>
									<TableCell align="right">數量</TableCell>
									<TableCell align="right">金額</TableCell>
									<TableCell>備註</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.Items?.map((r) => (
									<StyledTableRow key={r.Product?.Id}>
										<TableCell>{r.Product?.Id}</TableCell>
										<TableCell>{r.Product?.Name}</TableCell>
										<TableCell align="right">
											{Strings.formatPrice(
												r.Product?.UnitPrice
											)}
										</TableCell>
										<TableCell align="right">
											{Strings.formatPrice(r.Quantity)}
										</TableCell>
										<TableCell align="right">
											{Strings.formatPrice(r.TotalPrice)}
										</TableCell>
										<TableCell>{r.Note}</TableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
				<Box>
					<Grid container columns={12} spacing={0}>
						<FlexGrid
							item
							xs={12}
							sm={12}
							justifyContent="flex-end">
							<FormFieldLabel
								label="進貨合計"
								typographySx={{ textAlign: "right" }}>
								{Strings.formatPrice(data?.TotalPrice)}
							</FormFieldLabel>
						</FlexGrid>
						<FlexGrid
							item
							xs={12}
							sm={12}
							md={3}
							justifyContent="flex-end">
							<FormFieldLabel
								label="外加稅額"
								typographySx={{ textAlign: "right" }}>
								{Strings.formatPrice(data?.Tax)}
							</FormFieldLabel>
						</FlexGrid>
						<FlexGrid
							item
							xs={12}
							sm={12}
							md={3}
							justifyContent="flex-end">
							<FormFieldLabel
								label="總計金額"
								typographySx={{ textAlign: "right" }}>
								{Strings.formatPrice(data?.TotalPrice)}
							</FormFieldLabel>
						</FlexGrid>
						<FlexGrid
							item
							xs={12}
							sm={12}
							md={3}
							justifyContent="flex-end">
							<FormFieldLabel
								label="已付金額"
								typographySx={{ textAlign: "right" }}>
								{Strings.formatPrice(data?.Paid)}
							</FormFieldLabel>
						</FlexGrid>
						<FlexGrid
							item
							xs={12}
							sm={12}
							md={3}
							justifyContent="flex-end">
							<FormFieldLabel
								label="應付金額"
								typographySx={{ textAlign: "right" }}>
								{Strings.formatPrice(data?.ToPaid)}
							</FormFieldLabel>
						</FlexGrid>
					</Grid>
				</Box>
			</div>
		);
	})
);

C04OrderDetailTable.propTypes = {
	data: PropTypes.object,
};

C04OrderDetailTable.displayName = "C04OrderDetailTable";
export default C04OrderDetailTable;
