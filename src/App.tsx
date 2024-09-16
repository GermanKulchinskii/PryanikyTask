import { Outlet } from "react-router-dom";
import { UserProvider } from "./Context/useAuth";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material';

const App = () => {
    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline />
      
            {/* <UserProvider> */}
            {/* <div>hello</div> */}
            <Outlet />
          {/* </UserProvider> */}
        </ThemeProvider>
        </>
      );
}

export default App;
