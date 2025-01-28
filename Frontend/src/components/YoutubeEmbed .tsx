import { YoutubeEmbedProps } from "../types/lectureTypes";

const YoutubeEmbed = ({ url }: YoutubeEmbedProps) => {
  function getYoutubeVideoId(url: string) {
    const urlObject = new URL(url);
    const regex =
      /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = urlObject.href.match(regex);
    return matches ? matches[1] : null;
  }

  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return <p>Invalid video URL</p>;
  }

  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
