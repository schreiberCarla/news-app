import { useState, useEffect, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import Select from "react-select";
import NewsList from "../components/NewsList.tsx";
import SearchBar from "../components/SearchBar.tsx";
import ScrollToTopWrapper from "../components/ScrollToTopWrapper.tsx";
import { useLanguage } from "../context/LanguageContext.tsx";
import { translations } from "../locales/translations.ts";
import useFetch from "../hooks/useFetch.tsx";
import type { IArticle } from "../interfaces/IArticle.ts";
import type { INews } from "../interfaces/INews.ts";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const { language } = useLanguage();

  const { data: news, isLoading, error } = useFetch(
    `https://gnews.io/api/v4/search?q=example&lang=${language}&max=20&apikey=e8207dd9d3c3a32494793868a18b07a1`
  );

  // Quellen-Liste wird nur neu berechnet, wenn "news" sich ändert
  const sources = useMemo(
    () =>
      news ? [...new Set(news.articles.map(a => a.source.name))] : [],
    [news]
  );

  const filteredArticles: IArticle[] = useMemo(() => {
    if (!news) return [];

    return news.articles.filter(({ title, description, source }) => {
      const query = searchQuery.toLowerCase();
      const matchesQuery =
        !query ||
        title.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query);
      const matchesSource =
        selectedSources.length === 0 || selectedSources.includes(source.name);
      return matchesQuery && matchesSource;
    });
  }, [news, searchQuery, selectedSources]);

  return (
    <ScrollToTopWrapper>
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
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid>
            <p>
              {translations[language].countOfNews} : {filteredArticles.length}
            </p>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              width: "70%",
            }}
          >
            <Select
              isMulti
              name="sources"
              value={selectedSources.map(s => ({ value: s, label: s }))}
              options={sources.map(s => ({ value: s, label: s }))}
              isOptionDisabled={() => selectedSources.length >= 5}
              onChange={selected =>
                setSelectedSources(selected.map(s => s.value))
              }
              classNamePrefix="select"
            />
            <SearchBar setSearchQuery={setSearchQuery} />
          </Grid>
        </Grid>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading news.</p>}
        {!isLoading && !error && <NewsList articles={filteredArticles} />}
      </Box>
    </ScrollToTopWrapper>
  );
};

export default Home;
