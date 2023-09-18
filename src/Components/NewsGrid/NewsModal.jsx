import { Typography, Button, Dialog, DialogContent } from "@mui/material";
import { formatDate } from "../global/utils";
import styles from "./news.module.css";
const NewsModal = ({ selectedArticle, isModalOpen, setIsModalOpen }) => {
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "750px",
            height: "100%",
            maxHeight: "98vh",
          },
        },
      }}
      className={isModalOpen ? styles.blurredBackground : ""}
    >
      <DialogContent>
        {selectedArticle && (
          <div>
            <Typography variant="h6">{selectedArticle.articleTitle}</Typography>
            <Typography variant="body2" mt={0.5} sx={{ textIndent: 3 }}>
              {formatDate(selectedArticle.articleDate)}
            </Typography>
            <br />
            <Typography variant="body1">
              {selectedArticle.articleBody}
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
