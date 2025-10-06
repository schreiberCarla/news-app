import {useNavigate} from "react-router-dom";
import {AppBar, Box, MenuItem, Select, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useLanguage} from "../context/LanguageContext.tsx";
import {useEffect} from "react";
import {translations} from "../locales/translations.ts";


const Header = () => {
    const navigate = useNavigate();

    const {language, setLanguage} = useLanguage();

    useEffect(() => {
        console.log(language);
    }, [language]);

    return (
        <nav>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky" sx={{backgroundColor: '#123480'}}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {translations[language].title}
                        </Typography>
                        <Button color="inherit" onClick={() => navigate("/")}>{translations[language].news}</Button>
                        <Button color="inherit" onClick={() => navigate("categories")}>{translations[language].categories}</Button>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            label="Age"
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <MenuItem value={'de'}>Deutsch</MenuItem>
                            <MenuItem value={'en'}>English</MenuItem>
                        </Select>
                    </Toolbar>
                </AppBar>
            </Box>
        </nav>
    )
}

export default Header;