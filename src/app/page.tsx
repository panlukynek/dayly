import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import ScreensRail from "@/components/home/ScreensRail";
import FilesStory from "@/components/home/FilesStory";
import AssistantStory from "@/components/home/AssistantStory";
import Principles from "@/components/home/Principles";
import GetStarted from "@/components/GetStarted";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ScreensRail />
      <FilesStory />
      <AssistantStory />
      <Principles />
      <GetStarted />
    </>
  );
}
