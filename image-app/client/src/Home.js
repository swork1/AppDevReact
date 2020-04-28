import React from "react";

function HandleSubmit(input) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [responseToPost, setResponseToPost] = React.useState([]);

  React.useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post: input }),
    };

    async function fetchInput() {
      try {
        setIsLoaded(true);
        const response = await fetch("/api/world", requestOptions);
        const json = await response.json();
        setResponseToPost(json.test);
      } catch (error) {
        setIsLoaded(false);
      }
    }
    if (input === "") {
      setIsLoaded(false);
    } else {
      fetchInput();
    }
  }, [input]);

  return [responseToPost, isLoaded];
}

function Home() {
  const [search, setSearch] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [result, loaded] = HandleSubmit(query);

  return (
    <div className="App">
      <header className="App-header">Header</header>
      <p>Test Post Call</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>

      {loaded === false ? <p>Enter something to test</p> : <p>{result}</p>}
    </div>
  );
}

export default Home;
