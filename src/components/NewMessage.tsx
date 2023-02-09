import { MqttClient, QoS } from "mqtt";
import { FormEvent, useState } from "react";

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
      <input
        type="text"
        placeholder="topic"
        name="topic"
        required
        defaultValue={topic}
        onChange={(e) => setTopic(e.target.value.trim())}
      />
      <select
        name="qos"
        placeholder="qos"
        required
        defaultValue={qos}
        onChange={(e) => setQos(parseInt(e.target.value, 10) as QoS)}
      >
        {[0, 1, 2].map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        required
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value.trim())}
      />
      <button type="submit">PublishMessage</button>
    </form>
  );
}
