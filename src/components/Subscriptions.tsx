import { MqttClient, QoS } from "mqtt";
import { FormEvent, useState } from "react";
import { QoSOptions } from "./constants";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  mqttClient: MqttClient;
}

interface Subscription {
  topic: string;
  qos: QoS;
}

export default function Subscriptions({ mqttClient }: Props) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [qos, setQos] = useState<QoS>(0);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      topic &&
      !subscriptions.find((subscription) => subscription.topic === topic)
    ) {
      setIsSubscribing(true);
      mqttClient.subscribe(topic, { qos }, (error) => {
        setIsSubscribing(false);

        if (error) {
          alert(`${error.name} ${error.message}`);
          return;
        }

        setSubscriptions((currentSubscriptions) =>
          currentSubscriptions.concat({ topic, qos })
        );
      });
    }
  };

  return (
    <Stack spacing={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              type="text"
              label="Topic"
              name="topic"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="qos"
              label="QoS"
              value={qos}
              onChange={(e) => setQos(parseInt(e.target.value, 10) as QoS)}
              select
              fullWidth
            >
              {Object.entries(QoSOptions).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={isSubscribing}>
              {!isSubscribing ? "Subscribe" : <>Subscribing&hellip;</>}
            </Button>
          </Grid>
        </Grid>
      </form>
      {!subscriptions.length ? (
        <Typography variant="body1">No subscriptions</Typography>
      ) : (
        <Table aria-label="Topic subscriptions">
          <TableHead>
            <TableRow>
              <TableCell component="th">Topic</TableCell>
              <TableCell component="th">QoS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.topic}>
                <TableCell>{subscription.topic}</TableCell>
                <TableCell>{QoSOptions[subscription.qos]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
}
