import { MqttClient } from "mqtt";
import { FormEvent, useState } from "react";

interface Props {
  mqttClient: MqttClient;
}

export default function Subscriptions({ mqttClient }: Props) {
  const [subsctiptions, setSubscriptions] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTopic && !subsctiptions.includes(newTopic)) {
      mqttClient.subscribe(newTopic, { qos: 0 }, (error) => {
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
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="new_topic"
          defaultValue={newTopic}
          onChange={(e) => setNewTopic(e.target.value.trim())}
        />
        <button type="submit">Subscribe</button>
      </form>
      {subsctiptions.map((subscription) => (
        <div key={subscription}>{subscription}</div>
      ))}
    </>
  );
}
