import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "./style/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyle } from "./style/globalStyle";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={mainTheme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
