import { useState } from "react";
import { Card, CardMedia } from "@mui/material";
import { History } from "history";
import SongHover from "./SongHover";

interface SongProps {
  songId: number;
  name: string;
  album_image: string;
  history: History;
}

const Song = (props: SongProps) => {
  const { songId, name, album_image, history } = props;
  const [hovering, setHover] = useState(false);

  return (
    <>
      <Card
        sx={ {
          background: "#0A0A0A 0% 0% no-repeat padding-box;",
          color: "black",
          height: "250px",
          margin: "0px",
          opacity: ".7",
          padding: "0px",
          textAlign: "center",
          width: "250px",
        } }
        onClick={ () => history.push(`/home/song/${songId}`) }
      >
        <CardMedia
          image={ album_image }
          onMouseEnter={ () => setHover(true) }
          onMouseLeave={ () => setHover(false) }
          style={ {
            borderRadius: "100px",
            height: "200px",
            margin: "auto",
            marginTop: "25px",
            opacity: "1",
            width: "200px",
          } }
        >
          <SongHover hovering={ hovering } name={ name } />
        </CardMedia>
      </Card>
    </>
  );
};

export default Song;
