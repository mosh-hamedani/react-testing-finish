import SearchBox from "../components/SearchBox";

const PlaygroundPage = () => {
  return <SearchBox onChange={(text) => console.log(text)} />
};

export default PlaygroundPage;
