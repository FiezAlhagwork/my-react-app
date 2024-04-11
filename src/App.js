
import './App.css';
import {createTheme,ThemeProvider} from "@mui/material/styles"
import Weather from './COMPONENTS/Weather/Weather';
import { TranseltContext } from './COMPONENTS/Context';
import Container from '@mui/material/Container';
import {useState} from "react"







function App() {
  const [Translat,setTranslat] = useState('en')
  const [tiems, setTiems] = useState(null)
  const theme = createTheme({
      typography:{
        fontFamily:["IBM"]
      }
  });

  return (
    <TranseltContext.Provider value={{Translat,setTranslat,tiems, setTiems}}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" dir={Translat === "en" ? "ltr" : "rtl"}>
            <Weather/>
        </Container>
      </ThemeProvider>
    </TranseltContext.Provider>
  );
}

export default App;
