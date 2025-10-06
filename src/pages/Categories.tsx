import {Box, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {translations} from "../locales/translations.ts";
import NewsList from "../components/NewsList.tsx";
import {useLanguage} from "../context/LanguageContext.tsx";
import useFetch from "../hooks/useFetch.tsx";
import type {INews} from "../interfaces/INews.ts";
import {useState} from "react";

const Categories = () => {
    const [category, setCategory] = useState<string | null>(null);
    const [maxArticles, setMaxArticles] = useState(10);

    const {language} = useLanguage();
    const {data: news, isLoading, error} = useFetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=${language}&max=${maxArticles}&apikey=e8207dd9d3c3a32494793868a18b07a1`);

    return (
        <>
            <Box
                sx={{
                    width: "98%",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Grid
                    container
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Grid>
                        {news && <p>{translations[language].countOfNews}: {(news as INews).articles.length}</p>}
                    </Grid>
                    <Grid sx={{
                        display: "flex",
                        flexDirection: "rows",
                        justifyContent: "flex-end",
                        gap: "20px"
                    }}>
                        <FormControl>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <MenuItem value={"general"}>General</MenuItem>
                                <MenuItem value={"world"}>World</MenuItem>
                                <MenuItem value={"nation"}>Nation</MenuItem>
                                <MenuItem value={"business"}>Buisiness</MenuItem>
                                <MenuItem value={"technology"}>Technology</MenuItem>
                                <MenuItem value={"entertainment"}>Entertainment</MenuItem>
                                <MenuItem value={"sports"}>Sports</MenuItem>
                                <MenuItem value={"science"}>Science</MenuItem>
                                <MenuItem value={"health"}>Health</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="macArticle-label">Number of articles</InputLabel>
                            <Select
                                labelId="maxArticle-label"
                                id="maxArticle"
                                value={maxArticles}
                                label="Number of articles"
                                onChange={(e) => setMaxArticles(e.target.value)}
                            >
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {isLoading && <p>Loading...</p>}
                {news && <NewsList articles={(news as INews).articles} />}
                {error && <p>error</p>}
            </Box>
        </>
    )
}

export default Categories;