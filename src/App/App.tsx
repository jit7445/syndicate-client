import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { store } from "../redux/store";
import appTheme from "../constants/theme";
import router from "../routes/Routes";
import CartSync from "../modules/cart/components/CartSync";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CartSync />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
