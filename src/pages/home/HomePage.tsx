import Slider from "../../components/core/Slider";
import dummyData from "../../utils/dummy-data";

const HomePage = () => {
  const { homeDummyData } = dummyData();
  return (
    <div className="space-y-4 sm:space-y-8">
      <Slider title="Slider" data={homeDummyData} />
      <Slider title="Slider" data={homeDummyData} />
      <Slider title="Slider" data={homeDummyData} />
    </div>
  );
};

export default HomePage;
