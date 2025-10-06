import type {IArticle} from "../interfaces/IArticle.ts";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {translations} from "../locales/translations.ts";
import {useLanguage} from "../context/LanguageContext.tsx";

interface NewsCardProps {
    item : IArticle;
}

const NewsCard = ({item} : NewsCardProps) => {

    const {language} = useLanguage();

    const copyURLIntoClipboard = (url : string)=> {
        navigator.clipboard.writeText(url);
        alert("Copied link!");
    }

    return (
        <Card sx={{ maxWidth: 345, marginY: 2}}>
            <CardMedia
                sx={{ height: 200 }}
                image={item.image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",

                    }}
                >
                    {item.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => copyURLIntoClipboard(item.url)}>{translations[language].share}</Button>
                <Button size="small"><a href={item.url}>{translations[language].read_more}</a></Button>
            </CardActions>
        </Card>
    )
}

export default NewsCard;