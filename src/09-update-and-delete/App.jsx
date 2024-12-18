import { useState } from "react";
import Header from "/src/components/Header.jsx";
import Nav from "/src/components/Nav.jsx";
import Article from "/src/components/Article.jsx";
import Create from "/src/components/Create.jsx";
import Update from "/src/components/Update.jsx";

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ]);
  let content = null; //  동적 콘텐츠
  let contextControl = null;
  //  Update, Delete 버튼을 표시하기 위한 변수
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, Web"></Article>;
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    //  contextContol은 READ 모드일 때만 노출
    contextControl = (
      <li>
        <a
          href={"/update" + id}
          onClick={(event) => {
            event.preventDefault(); //  이벤트 기본 동작 중지
            setMode("UPDATE"); //  mode를 UPDATE로 변경
          }}
        >
          Update
        </a>
      </li>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    //  현재 선택된 topic의 title, body
    let title = null,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          console.log(title, body);
        }}
      ></Update>
    );
  }

  return (
    <div className="App">
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>
        {/* Update, Delete메뉴는 READ 모드일 때만 노출 */}
        {/* <a href="/update">Update</a> */}
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
