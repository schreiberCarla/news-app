import NewsCard from "./NewsCard.tsx";
import type {IArticle} from "../interfaces/IArticle.ts";
import {Grid} from "@mui/material";

interface INewsProps {
    articles: IArticle[];
}

const NewsList = ({articles} : INewsProps) => {
    return (
        <Grid container justifyContent="space-between" alignItems="stretch">
            {articles.map((item, index) => (
                    <NewsCard key={index} item={item} />
            ))}
        </Grid>
    )
}

export default NewsList;