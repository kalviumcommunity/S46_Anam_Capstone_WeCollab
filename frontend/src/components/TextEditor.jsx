import { useRef, useEffect } from 'react';
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Pilcrow, Underline } from 'lucide-react';

const RichTextEditor = ({handleAbout}) => {
  const editorRef = useRef(null);

  const handleContentChange = () => {
    if (editorRef.current) {
      console.log("editor updating")
      handleAbout(editorRef.current.contentDocument.body.innerHTML)
    }
  };

  useEffect(() => {
    if(editorRef.current){
        const editor = editorRef.current.contentDocument;
        
          const head = editor.querySelector('head');
          const body = editor.querySelector('body');
    
          head.innerHTML += `<style>
            *, ::after, ::before {box-sizing: border-box;}
            :root {tab-size: 4;}
            html {line-height: 1.15;text-size-adjust: 100%;}
            body {margin: 0px; padding: 1rem 0.5rem;}
            body {font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";}
          </style>`;
    
          body.innerHTML += ``;

          editor.addEventListener('input', handleContentChange)
    
          editor.designMode = 'on';

          return () => {
            editor.removeEventListener('input', handleContentChange);
          };
    }
    
  }, []);

  const formatCommand = (cmd, param) => {
    if (editorRef.current && editorRef.current.contentDocument) {
      editorRef.current.contentDocument.execCommand(cmd, !1, param || null);
    }
  };

  return (
        <div className="border-black border overflow-hidden rounded-md">
          <div className="w-full flex border-b border-black text-xl text-gray-600">
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-r border-black w-10 h-10 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('bold')}
            >
              <i className="mdi mdi-format-bold">
                <Bold/>
              </i>
            </div>
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-r border-black w-10 h-10 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('italic')}
            >
              <i className="mdi mdi-format-italic">
                <Italic/>
              </i>
            </div>
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-r border-black w-10 h-10 mr-1 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('underline')}
            >
              <i className="mdi mdi-format-underline">
                <Underline/>
              </i>
            </div>
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-r border-black w-10 h-10 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('formatBlock', 'P')}
            >
              <i className="mdi mdi-format-paragraph">
                <Pilcrow/>
              </i>
            </div>
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-r border-black w-10 h-10 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('formatBlock', 'H1')}
            >
              <i className="mdi mdi-format-header-1">
                <Heading1/>
              </i>
            </div>
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-r border-black w-10 h-10 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('formatBlock', 'H2')}
            >
              <i className="mdi mdi-format-header-2">
                <Heading2/>
              </i>
            </div>
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-r border-black w-10 h-10 mr-1 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('formatBlock', 'H3')}
            >
              <i className="mdi mdi-format-header-3">
                <Heading3/>
              </i>
            </div>
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-r border-black w-10 h-10 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('insertUnorderedList')}
            >
              <i className="mdi mdi-format-list-bulleted">
                <List/>
              </i>
            </div>
            <div
              className="flex items-center justify-center outline-none focus:outline-none border-black w-10 h-10 mr-1 hover:text-black active:bg-gray-50"
              onClick={() => formatCommand('insertOrderedList')}
            >
              <i className="mdi mdi-format-list-numbered">
                <ListOrdered/>
              </i>
            </div>
          </div>
          <div className="w-full">
            <iframe ref={editorRef} className="w-full h-80 overflow-y-auto"></iframe>
          </div>
        </div>
  );
};

export default RichTextEditor;