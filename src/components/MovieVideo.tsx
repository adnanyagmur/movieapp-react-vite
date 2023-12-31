import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LiveTvIcon from "@mui/icons-material/LiveTv";

type VideoResultDTO = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

type VideoPageDTO = {
  videos: VideoResultDTO[];
};

export default function MovieVideo({ videos }: VideoPageDTO) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoResultDTO | null>(
    null
  );

  const handleVideoClick = (video: VideoResultDTO) => {
    setSelectedVideo(video);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVideo(null);
  };
  return (
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <div style={{ overflowX: "auto", display: "flex" }}>
          {videos?.map((video: VideoResultDTO) => (
            <Card
              key={video.id}
              sx={{ minWidth: 250, margin: "0 8px", cursor: "pointer" }}
              onClick={() => handleVideoClick(video)}
            >
            
              <CardMedia
                component="img"
                height="150"
                image={`https://img.youtube.com/vi/${video?.key}/0.jpg`}
                alt={video?.name}
              />
              <CardContent>
                <Tooltip title={video?.name} arrow>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "cursive",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {" "}
                    {video?.name}
                  </Typography>
                </Tooltip>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography variant="body2">
                  Video Type : {video?.type}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => handleVideoClick(video)}
                  sx={{ pt: 1, fontFamily: "fantasy" }}
                  startIcon={<LiveTvIcon />}
                >
                  {" "}
                  Watch Video{" "}
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent sx={{ p: 0, m: 0 }}>
          {selectedVideo && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideo?.key}`}
              title={selectedVideo?.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
