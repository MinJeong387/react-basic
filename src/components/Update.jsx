import PropTypes from "prop-types";
import { useState } from "react";

function Update(props) {
  // title, body, onUpdate
  //   const title = props.title;
  //   const body = props.body;
  const [title, setTitle] = useState(props.title); // props.title 을 title로 바꾸면 충돌나서 헷갈리므로 여기서는 그냥 props 쓸꺼래래
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
          {/* value 속성과 onChange 이벤트를 이용해서 상태를 관리 */}
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}

Update.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  onUpdate: PropTypes.func,
};

export default Update;
