import { MqttClient, QoS } from "mqtt";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  topic: string;
  qos: QoS;
  message: string;
}

export default function useMessages(mqttClient: MqttClient | null) {
  const idRef = useRef(1);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    mqttClient?.on("message", (topic, message, packet) => {
      setMessages((currentMessages) =>
        currentMessages.concat({
          id: idRef.current++,
          topic,
          qos: packet.qos,
          message: message.toString()
        })
      );
    });
  }, [mqttClient]);

  return messages;
}
