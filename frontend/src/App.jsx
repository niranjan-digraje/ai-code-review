import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
//import "prismjs/components/prism-jsx"
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  const [code, setCode] = useState(`function sum(){
    return 1+2
  }`);

  const [review, setReview] = useState(``)

  useEffect(()=>{
    prism.highlightAll();
  },[]);

  async function reviewCode() {
    const response = await axios.post(`https://ai-code-review-backend-in5b.onrender.com/ai/get-review`,{code})
    //console.log(response.data);
    setReview(response.data);
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              style={
                {
                  fontFamily:'"Fira code","Fira Mono", monospace',
                  fontSize:15,
                  border:"",
                  borderRadius:"5px",
                  height:"100%",
                  width:"100%",
                  padding:"2px",
                  overflow:"auto"
                }
              }
            />
          </div>
          <div 
          onClick={reviewCode}
          className="review">
            Review
          </div>
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
