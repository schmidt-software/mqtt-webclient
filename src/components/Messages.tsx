import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { QoSOptions } from "./constants";
import useMessages from "./useMessages";

type Props = {
  messages: ReturnType<typeof useMessages>;
};

export default function Messages({ messages }: Props) {
  if (!messages.length) {
    return <Typography variant="body1">No messages</Typography>;
  }

  return (
    <Table aria-label="Messages">
      <TableHead>
        <TableRow>
          <TableCell component="th">Message</TableCell>
          <TableCell component="th">Topic</TableCell>
          <TableCell component="th">QoS</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {messages.map(({ id, message, topic, qos }) => (
          <TableRow key={id}>
            <TableCell style={{ whiteSpace: "pre-wrap" }}>{message}</TableCell>
            <TableCell>{topic}</TableCell>
            <TableCell>{QoSOptions[qos]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
