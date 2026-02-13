import { Composition } from "remotion";
import { F1Ferrari } from "./F1Ferrari";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="F1Ferrari"
      component={F1Ferrari}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
