import React from "react";
import './Meme.css';


export const Meme = ({ template, onClick }) => {
  return (
    <div class="card" onClick={onClick}>
      <img 
      className="allmemes"
      key={template.id}
      src={template.url}
      alt={template.name}
      onClick={onClick}
      />
      <p>{template.name}</p>
    </div>
    
  );
};

