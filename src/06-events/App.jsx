import PropTypes from "prop-types";

function Header({ title, onChangeMode }) {
  //  title, onChangeMode
  //   console.log("props", props);       // props 다 가져올 수 있지만, 일부만 가져오는게 좋다 !
  console.log("title:", title);
  return (
    <header>
      <h1>
        {/* 클릭 이벤트 부착 */}
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault(); //  이벤트 기본 동작 막음
            onChangeMode();
          }}
        >
          {title}
        </a>
      </h1>
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string,
  onChangeMode: PropTypes.func,
};
// function Nav(props) {
function Nav({ topics, onChangeMode }) {
  //  topics, onChangeMode
  /*
  const lis = [];
  for (let i = 0; i < topics.length; i++) {
    let t = topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault(); // 기본 동작 막기
            onChangeMode(event.target.id);
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
  */
  return topics.map((topic) => (
    <li key={topic.id}>
      <a
        id={topic.id}
        href={"/read/" + topic.id}
        onClick={(event) => {
          event.preventDefault(); // 기본 동작 막기
          onChangeMode(event.target.id);
        }}
      >
        {topic.title}
      </a>
    </li>
  ));
}
Nav.propTypes = {
  topics: PropTypes.array,
  onChangeMode: PropTypes.func,
};
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
Article.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];

  return (
    <div className="App">
      {/* onChangeMode 이벤트 핸들러 전달 */}
      <Header
        title="WEB"
        onChangeMode={function () {
          alert("Header");
        }}
      ></Header>
      {/* Nav의 각각의 타이틀 링크를 누르면 
        alert 창이 뜨도록 */}
      <Nav
        topics={topics}
        onChangeMode={(id) => {
          alert(id);
        }}
      ></Nav>
      <Article title="Welcome" body="Hello, Web"></Article>
    </div>
  );
}

export default App;
