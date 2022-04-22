import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Router from "./Router";

ReactDOM.render(
  <MantineProvider>
    <NotificationsProvider>
      <Router />
    </NotificationsProvider>
  </MantineProvider>,
  document.getElementById("root")
);
