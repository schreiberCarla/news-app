import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchBarProps {
    setSearchQuery: (query: string) => void;
}

const SearchBar = ({setSearchQuery} : ISearchBarProps) => {
    return (
        <form>
            <TextField
                id="search-bar"
                className="text"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                onInput={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                    },
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </form>

    )
}

export default SearchBar;