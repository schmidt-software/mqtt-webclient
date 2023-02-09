import { useState } from "react";
import { FormEvent } from "react";

import useMqttConnection from "./useMqttConnection";

type Props = Pick<
  ReturnType<typeof useMqttConnection>,
  "mqttClient" | "connectionStatus" | "error" | "connect"
>;

export default function ConnectionSettings({
  mqttClient,
  connectionStatus,
  error,
  connect
}: Props) {
  const [host, setHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    connect(host, username, password);
  };

  const isInputDisabled = connectionStatus !== "disconnected";

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="host"
        placeholder="hostname:port"
        required
        disabled={isInputDisabled}
        defaultValue={host}
        onChange={(e) => setHost(e.target.value.trim())}
      />
      <input
        type="text"
        name="username"
        placeholder="username"
        required
        disabled={isInputDisabled}
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value.trim())}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        required
        disabled={isInputDisabled}
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value.trim())}
      />
      {connectionStatus === "disconnected" && (
        <button type="submit">Connect</button>
      )}
      {connectionStatus === "connecting" && "Connecting"}
      {connectionStatus === "connected" && (
        <>
          <button type="button" onClick={() => mqttClient?.end()}>
            Disconnect
          </button>{" "}
          Connected
        </>
      )}
      {error}
    </form>
  );
}
