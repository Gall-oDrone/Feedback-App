import React from "react";

const Result = ({ journal }) => {
  return (
    <div>
      <li>
        <span>
          <b>Title:</b> {journal.title}{" "}
        </span>
        <span>
          <b>Author:</b> {journal.author}{" "}
        </span>
        <span>
          <b>Topic:</b>
          {journal.inquiry_topic.map(c => {
            return <span key={c}>{c} </span>;
          })}
        </span>
        <span>
          <b>Type:</b>
          {journal.inquiry_type.map(c => {
            return <span key={c}>{c} </span>;
          })}
        </span>
        <span>
          <b>University:</b> {journal.user_university}{" "}
        </span>
        <span>
          <b>Publish date:</b> {journal.start}{" "}
        </span>
        <span>
          <b>View count:</b> {journal.view_count}{" "}
        </span>
      </li>
      <hr />
    </div>
  );
};

export default Result;