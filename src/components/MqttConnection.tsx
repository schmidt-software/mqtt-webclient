import { useState } from "react";
import { FormEvent } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import useMqttConnection from "./useMqttConnection";

type Props = Pick<
  ReturnType<typeof useMqttConnection>,
  "mqttClient" | "connectionStatus" | "error" | "connect"
>;

export default function ConnectionSettings({
  mqttClient,
  connectionStatus,
  error,
  connect,
}: Props) {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    connect(`${host}:${port}`, username, password);
  };

  const isInputDisabled = connectionStatus !== "disconnected";

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <TextField
            type="text"
            name="host"
            label="Host"
            required
            disabled={isInputDisabled}
            value={host}
            onChange={(e) => setHost(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            name="port"
            label="Port"
            required
            disabled={isInputDisabled}
            value={port}
            onChange={(e) => setPort(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            name="username"
            label="Username"
            required
            disabled={isInputDisabled}
            value={username}
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="password"
            name="password"
            label="Password"
            required
            disabled={isInputDisabled}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          {connectionStatus !== "connected" ? (
            <Button
              type="submit"
              variant="contained"
              disabled={connectionStatus !== "disconnected"}
            >
              {connectionStatus !== "connecting" ? (
                "Connect"
              ) : (
                <>Connecting&hellip;</>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outlined"
              onClick={() => mqttClient?.end()}
            >
              Disconnect
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          {connectionStatus === "connected" && (
            <Typography variant="body1" align="right" color="success.main">
              Connected
            </Typography>
          )}
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
      </Grid>
    </form>
  );
}
