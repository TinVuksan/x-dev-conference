import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogContent,
  Container,
} from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formatDate } from "../global/utils";
import styles from "./news.module.css";
import NewsModal from "./NewsModal";
const NewsGrid = () => {
  const [news, setNews] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getNews = async () => {
      try {
        const response = await axiosPrivate.get("/articles/all", {
          signal: controller.signal,
        });
        isMounted && setNews(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getNews();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleCardClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <Grid container spacing={2} mt="auto" className={styles.newsBackground}>
      {news.map((news) => (
        <Grid item key={news.id} xs={12} md={6}>
          <Paper
            onClick={() => handleCardClick(news)}
            elevation={5}
            className={styles.newsPaper}
          >
            <div className={styles.newsHeader}>
              <Typography className={styles.newsHeaderTitle} variant="h4">
                {news.articleTitle}
              </Typography>
              <Typography className={styles.newsHeaderDate} variant="h6">
                {formatDate(news.articleDate)}
              </Typography>
            </div>
            <div className={styles.articleContent}>
              <Typography variant="body1">
                {news.articleBody.substring(0, 300)}...
              </Typography>
            </div>
            <div className={styles.readMoreButton}>
              <Button variant="outlined" color="secondary">
                Click to read more
              </Button>
            </div>
          </Paper>
        </Grid>
      ))}

      <NewsModal
        selectedArticle={selectedArticle}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Grid>
  );
};

export default NewsGrid;
