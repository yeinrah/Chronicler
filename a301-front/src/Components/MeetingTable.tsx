import { VoiceOverOff } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
const MeetingTable = (props: any) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 700,
        maxHeight: 300,
        overflow: 'auto',
        backgroundColor: 'var(--eleBase-color)',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>회의 넘버</TableCell>
            <TableCell align="right">시작시간</TableCell>
            <TableCell align="right">종료시간</TableCell>
            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listItem.map((row: any) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{String(row.startDate)}</TableCell>
              <TableCell align="right">{String(row.endDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default MeetingTable;
