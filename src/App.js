import React, { useState, useEffect } from "react";
import { Meme } from "./components/Meme.js";
import './App.css';
import swal from 'sweetalert';

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

export default function App() {

const [templates, setTemplates] = useState([]);
const [template, setTemplate] = useState(null);
const [firstText, setFirstText] = useState("");
const [secondText, setSecondText] = useState("");
const [thirdText, setThirdText] = useState("");
const [fourthText, setFourthText] = useState("");
const [fifthText, setFifthText] = useState("");
const [meme, setMeme] = useState(null);

  
useEffect(() => {
  fetch("https://api.imgflip.com/get_memes").then(p =>
    p.json().then(response => setTemplates(response.data.memes))
  );
}, []);

if (meme) {
  return (
    <div style={{ textAlign: "center" }}>
      <a href={meme} download title={template.name}> <img  src={meme} alt="custom meme" className="finalmeme" /></a>
    </div>
  );
}

  return (
    <div style={{ textAlign: "center" }}>
    {template && (
      <form
        onSubmit={async e => {
          e.preventDefault();
          const params = {
            "template_id": template.id,
            "username": "jojo6789",
            "password": "jojo@007",
            "font": "arial",
            "boxes[0][text]": firstText,
            "boxes[1][text]": secondText,
            "boxes[2][text]": thirdText,
            "boxes[3][text]": fourthText,
            "boxes[4][text]": fifthText,
        }
        
          const response = await fetch(
            `https://api.imgflip.com/caption_image${objectToQueryParam(
              params
            )}`
          );
          try {
            const json = await response.json();
            setMeme(json.data.url);
          } catch (error) {
            swal({title: "Wait that's illegal !",
            text: "Enter at least one text to make le meme",}
          );
          }
          
        }}
      > <h1 >Add your texts</h1>
        <img src={template.url} alt={template.name} className="selectedmeme" /><br/>
        <input className="inputfield"
          placeholder="first text"
          value={firstText}
          onChange={e => setFirstText(e.target.value)}
        /><br/>
        <input className="inputfield"
          placeholder="second text"
          value={secondText}
          onChange={e => setSecondText(e.target.value)}
        /><br/>
        <input className="inputfield"
          placeholder="third text"
          value={thirdText}
          onChange={e => setThirdText(e.target.value)}
        /><br/>
        <input className="inputfield"
          placeholder="fourth text"
          value={fourthText}
          onChange={e => setFourthText(e.target.value)}
        /><br/>
        <input className="inputfield"
          placeholder="fifth text"
          value={fifthText}
          onChange={e => setFifthText(e.target.value)}
        /><br/>
        <button type="submit" className="submitbutton">create meme</button>
      </form>
    )}
    {!template && (
      <>
        <div>
          <h1>Meme Generator</h1>
          <h3>Select a template</h3>
        </div>
        <div className="templatetotal">
        {templates.map(template => {
          return (
            <Meme
              template={template}
              onClick={() => {
                setTemplate(template);
              }}
            />
          );
        })}
        </div>
      </>
    )}
  </div>
);
}
