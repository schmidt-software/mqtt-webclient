import { MqttClient, QoS } from "mqtt";
import { FormEvent, useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  mqttClient: MqttClient;
}

export default function NewMessage({ mqttClient }: Props) {
  const [topic, setTopic] = useState("");
  const [qos, setQos] = useState<QoS>(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mqttClient.publish(topic, message, { qos }, (error) => {
      if (error) {
        alert(`${error.name} ${error.message}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
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
        <Grid item xs={3}>
          <TextField
            name="qos"
            label="QoS"
            value={qos}
            onChange={(e) => setQos(parseInt(e.target.value, 10) as QoS)}
            select
            fullWidth
          >
            {[0, 1, 2].map((i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="message"
            label="Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Publish Message
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
