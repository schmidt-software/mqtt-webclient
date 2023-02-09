import useMessages from "./useMessages";

type Props = {
  messages: ReturnType<typeof useMessages>;
};

export default function Messages({ messages }: Props) {
  if (!messages.length) {
    return <>No messages</>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Message</th>
          <th>Topic</th>
          <th>QoS</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(({ id, message, topic, qos }) => (
          <tr key={id}>
            <td>{message}</td>
            <td>{topic}</td>
            <td>{qos}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
