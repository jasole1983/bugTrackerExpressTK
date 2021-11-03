import React, { useReducer } from 'react'
import { defaultMemoize } from 'reselect';
import './DragAndDrop.css'

function DragAndDrop({ data, dispatch }) {

  const handleDragEnter = (e) => {
    e.preventDefault();
    dispatch({ type: 'AddToDropZone', inDropZone: true })
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    dispatch({ type: 'AddToDropZone', inDropZone: true })
  };

  const handleDrop = (e) => {
    e.preventDefault();

    let files = [ ...e.dataTransfer.files ];
    let files_with_preview = [];

    files.map((file) => {
      file["preview"] = URL.createObjectURL(file);
      files_with_preview.push(file);
    })

    if (files) {
      dispatch({ type: "AddToList", files });
      dispatch({ type: "AddToDropZone", inDropZone: false });
    }
  };

  return (
    <>
      <div 
        className={"drag-drop-zone"}
        onDrop={(e) => handleDrop(e)}  
        onDragOver={(e) => handleDragOver(e)}  
        onDragEnter={(e) => handleDragEnter(e)}  
      >
        <p>Drag your screenshot files here!</p>
        <ol className="dropped-files">
          {data.fileList.map((file) => {
            return (
            <li key={file.name}>
              <p>{file.name}</p>
              <img 
                src={file.preview}
                alt=""
                style={{ width: 100, height: 100 }}
              />
            </li>
            );
          })}
        </ol>
      </div>
    </>
    )
  }

export default function DragAndDropComp () {
  const state = {
    inDropZone: false,
    fileList: []
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "AddToDropZone":
        return { ...state, inDropZone: action.inDropZone };
      case "AddToList":
        return {
          ...state,
          fileList: state.fileList.concat(action.files),
        };
        default:
          return state;
    }
  }
  const [ data, dispatch ] = useReducer(reducer, state)

  return (
    <div className="DragAndDropComp">
      <DragAndDrop data={data} dispatch={dispatch} />
      
    </div>
  )


}



  
  




