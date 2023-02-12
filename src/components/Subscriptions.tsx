import { MqttClient } from "mqtt";
import { FormEvent, useState } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

interface Props {
  mqttClient: MqttClient;
}

export default function Subscriptions({ mqttClient }: Props) {
  const [subsctiptions, setSubscriptions] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTopic && !subsctiptions.includes(newTopic)) {
      setIsSubscribing(true);
      mqttClient.subscribe(newTopic, { qos: 0 }, (error) => {
        setIsSubscribing(false);

        if (error) {
          alert(`${error.name} ${error.message}`);
          return;
        }

        setSubscriptions((currentSubscriptions) =>
          currentSubscriptions.concat(newTopic)
        );
      });
    }
  };

  return (
    <Stack spacing={2}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            type="text"
            name="new_topic"
            label="Topic"
            onChange={(e) => setNewTopic(e.target.value.trim())}
          />
          <div>
            <Button type="submit" variant="contained" disabled={isSubscribing}>
              {!isSubscribing ? "Subscribe" : <>Subscribing&hellip;</>}
            </Button>
          </div>
        </Stack>
      </form>
      {!subsctiptions.length && (
        <Typography variant="body1">No subscriptions</Typography>
      )}
      {!!subsctiptions.length && (
        <Table aria-label="Topic subscriptions">
          <TableBody>
            {subsctiptions.map((subscription) => (
              <TableRow key={subscription}>
                <TableCell>{subscription}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
}
