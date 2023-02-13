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
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (topic && !subscriptions.includes(topic)) {
      setIsSubscribing(true);
      mqttClient.subscribe(topic, { qos: 0 }, (error) => {
        setIsSubscribing(false);

        if (error) {
          alert(`${error.name} ${error.message}`);
          return;
        }

        setSubscriptions((currentSubscriptions) =>
          currentSubscriptions.concat(topic)
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
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <div>
            <Button type="submit" variant="contained" disabled={isSubscribing}>
              {!isSubscribing ? "Subscribe" : <>Subscribing&hellip;</>}
            </Button>
          </div>
        </Stack>
      </form>
      {!subscriptions.length && (
        <Typography variant="body1">No subscriptions</Typography>
      )}
      {!!subscriptions.length && (
        <Table aria-label="Topic subscriptions">
          <TableBody>
            {subscriptions.map((subscription) => (
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
