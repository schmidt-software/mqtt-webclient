import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "lightgray" } }} />
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" my={2}>
          MQTT Web Client
        </Typography>
        <Stack spacing={4}>
          <Card>
            <CardContent component="section">
              <Typography component="h2" variant="h5" mb={2}>
                Connection
              </Typography>
              <MqttConnection {...mqttConnection} />
            </CardContent>
          </Card>
          {mqttClient && (
            <>
              <Card>
                <CardContent component="section">
                  <Typography component="h2" variant="h5" mb={2}>
                    Subscriptions
                  </Typography>
                  <Subscriptions mqttClient={mqttClient} />
                </CardContent>
              </Card>
              <Card>
                <CardContent component="section">
                  <Typography component="h2" variant="h5" mb={2}>
                    Messages
                  </Typography>
                  <Stack spacing={2}>
                    <NewMessage mqttClient={mqttClient} />
                    <Messages messages={messages} />
                  </Stack>
                </CardContent>
              </Card>
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}
