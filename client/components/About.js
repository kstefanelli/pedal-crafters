import React from "react";

const technologies = [
  { id: 1, logoSrc: "/react.png", altText: "react-logo", name: "React" },
  { id: 2, logoSrc: "/redux.png", altText: "redux-logo", name: "Redux" },
  { id: 3, logoSrc: "/js.png", altText: "js-logo", name: "JavaScript" },
  { id: 4, logoSrc: "/nodejs.png", altText: "nodejs-logo", name: "Node.js" },
  {
    id: 5,
    logoSrc: "/postgresql.png",
    altText: "postgresql-logo",
    name: "PostgreSQL",
  },
  { id: 6, logoSrc: "/html.png", altText: "html-logo", name: "HTML" },
  { id: 7, logoSrc: "/css.png", altText: "css-logo", name: "CSS" },
  { id: 8, logoSrc: "/heroku.png", altText: "heroku-logo", name: "Heroku" },
];

export default function About() {
  return (
    <div className='about-container'>
      <div className='about-technologies-container'>
        <h3 className='about-technologies-heading'>
          Technologies used to build PedalCrafters:
        </h3>
        <div className='about-technologies'>
          <span className='about-left'>
            <ul className='about-technologies-list'>
              {technologies.map((tech) => (
                <li key={tech.id} className='about-technologies-item'>
                  <img
                    src={tech.logoSrc}
                    alt={tech.altText}
                    className='about-technologies-pic'
                  />
                  <span className='about-technologies-name'>{tech.name}</span>
                </li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
}
