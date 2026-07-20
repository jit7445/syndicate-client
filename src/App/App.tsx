import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { store } from "../redux/store";
import appTheme from "../constants/theme";
import router from "../routes/Routes";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
