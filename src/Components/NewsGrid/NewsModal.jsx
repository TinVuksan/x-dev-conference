import { Typography, Button, Dialog, DialogContent } from "@mui/material";
import { formatDate } from "../global/utils";
import styles from "./news.module.css";
const NewsModal = ({ selectedArticle, isModalOpen, setIsModalOpen }) => {
  console.log(selectedArticle?.articleImageUrl);
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "850px",
            height: "100%",
            maxHeight: "90vh",
          },
        },
      }}
      className={isModalOpen ? styles.blurredBackground : ""}
    >
      <DialogContent>
        {selectedArticle && (
          <div>
            <img
              src={selectedArticle.articleImageUrl}
              alt="Article image"
              style={{ width: "400px", maxwidth: "600px" }}
            />
            <Typography variant="h6">{selectedArticle.articleTitle}</Typography>
            <Typography variant="body2" mt={0.5} sx={{ textIndent: 3 }}>
              {formatDate(selectedArticle.articleDate)}
            </Typography>
            <br />
            <Typography variant="body1">
              <div className={styles.displayLinebreak}>
                {selectedArticle.articleBody}
              </div>
            </Typography>
          </div>
        )}
        <Button
          onClick={() => setIsModalOpen(false)}
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2 }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;
