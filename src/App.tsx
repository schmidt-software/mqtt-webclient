import "./styles.css";

import MqttConnection from "./components/MqttConnection";
import useMqttConnection from "./components/useMqttConnection";
import Subscriptions from "./components/Subscriptions";
import NewMessage from "./components/NewMessage";
import useMessages from "./components/useMessages";
import Messages from "./components/Messages";

export default function App() {
  const mqttConnection = useMqttConnection();
  const { mqttClient } = mqttConnection;
  const messages = useMessages(mqttClient);

  return (
    <>
      <h1>MQTT Web Client</h1>
      <h2>Connection</h2>
      <MqttConnection {...mqttConnection} />
      {mqttClient && (
        <>
          <h2>Subscriptions</h2>
          <Subscriptions mqttClient={mqttClient} />
          <h2>Messages</h2>
          <NewMessage mqttClient={mqttClient} />
          <Messages messages={messages} />
        </>
      )}
    </>
  );
}
