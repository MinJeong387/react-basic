import { number } from "prop-types";
import { useState } from "react"; // useState Hook 사용
import PropTypes from "prop-types";

function Header(props) {
  console.log("props", props.title);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string,
  onChangeMode: PropTypes.func,
};

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(event.target.id);
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
  //   const mode = "WELCOME";
  //   const mode = "READ";         -> 이렇게 번거롭게 가지말고, useState 이용하자.
  const [mode, setMode] = useState("Welcome");

  // 현재 선택된 게시물의 아이디 저장 상태 변수
  const [id, setId] = useState(null);
  //   state문법 : const[state이름, state변경함수] = useState(초기state값);

  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];

  // 동적 콘텐츠 구성을 위한 변수
  let content = null;
  if (mode === "WELCOME") {
    // Welcome 페이지 구성
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === "READ") {
    // 게시물 페이지 구성

    // id state와 topic의 id가 동일한 객체 찾기
    let title = null,
      body = null;
    // 검색
    for (let i = 0; i < topics.length; i++) {
      let topic = topics[i];

      if (topic.id === Number(id)) {
        title = topic.title;
        body = topic.body;
        break;
      }
    }
    content = <Article title={title} body={body}></Article>;
  }
  return (
    <div className="App">
      <Header
        title="WEB"
        onChangeMode={() => {
          //   alert("Header");
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          //   alert(id);
          setMode("READ");
          // 선택된 게시물 _id -> id 상태변수로 설정
          setId(_id);
        }}
      ></Nav>
      {/* mode에 따라 다른 페이지 구성 */}
      {content}
    </div>
  );
}

export default App;
