import mqtt, { MqttClient } from "mqtt";
import { useCallback, useEffect, useState } from "react";

type ConnectionStatus = "disconnected" | "connecting" | "connected";

const mqttDefaultConnectionOptions = {
  protocolVersion: 4,
  path: "/mqtt",
  clean: true,
  resubscribe: false,
  keepalive: 60,
  reconnectPeriod: 0
};

export default function useMqttConnection() {
  const [clientId] = useState(
    `webclient_${Math.random().toString(16).substr(2, 8)}`
  );
  const [mqttClient, setMqttClient] = useState<MqttClient | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    "disconnected"
  );
  const [error, setError] = useState("");

  const connect = useCallback(
    (host: string, username: string, password: string) => {
      setError("");
      setConnectionStatus("connecting");

      const client = mqtt.connect(`wss://${host}`, {
        clientId,
        username,
        password,
        ...mqttDefaultConnectionOptions
      });
      client.on("connect", () => {
        setMqttClient(client);
        setConnectionStatus("connected");
      });
      client.on("close", () => {
        setMqttClient(null);
        setConnectionStatus("disconnected");
      });
      client.on("error", (e) => {
        setMqttClient(null);
        setConnectionStatus("disconnected");
        setError(`ERROR - ${e.name} ${e.message}`);
      });
    },
    [clientId]
  );

  useEffect(
    () => () => {
      mqttClient?.end();
    },
    [mqttClient]
  );

  return {
    mqttClient,
    connectionStatus,
    error,
    connect
  };
}
