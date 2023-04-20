// pages/news/index.tsx
import type { NextPage } from "next";
import Image from "next/image";
import MarkdownArticle from "../../components/news/MarkdownArticle";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bold, Italic, LinkAlt, ImageAdd, Save, ListUl } from "styled-icons/boxicons-regular";
import { Title } from "styled-icons/material";
import { Quote } from "styled-icons/bootstrap";
import { RemoveRedEye } from "styled-icons/material-outlined";
/*
function ArticleComponent(props: any) {
  return (
    <>
      <Link href={props.link} className="cursor-pointer flex w-[250px] ">
        <div className="space-y-1 mr-auto outline outline-2 outline-zinc-300 rounded-md hover:scale-105 duration-200 flex flex-col">
          <div className="relative h-[250px] w-[250px]">
            {props.new && (
              <Image
                src={"/images/new_icon.png"}
                alt="new"
                className="absolute top-2 left-2 z-10 "
                width={50}
                height={50}
              />
            )}
            <Image
              src={props.image}
              alt="article preview"
              fill
              className="rounded-md"
            />
          </div>
          <div className="px-2 py-2 mx-auto text-center w-[250px]">
            <MarkdownArticle markdown={props.data} />
          </div>
        </div>
      </Link>
    </>
  );
}
*/

function PreviewBtn(props: any) {
  return(
    <div 
      className={
      	props.previewOn
      	  ? "flex items-center active:bg-[#6544c9] bg-[#393D45] rounded-md cursor-pointer"
      	  : "flex items-center active:bg-[#6544c9] hover:bg-[#393D45] rounded-md cursor-pointer"
      }      
      onClick={props.handler}
    >
      <RemoveRedEye className="w-8 px-2 aspect-square"/>
      <p className="text-white text-sm">Preview</p>
    </div>
  )
}

function SaveBtn(props: any) {
  return(
    <div 
      className="flex items-center active:bg-[#6544c9] hover:bg-[#393D45] rounded-md cursor-pointer"
    >
      <Save className="w-8 px-2 aspect-square"/>
      <p className="text-white text-sm">Save</p>
    </div>
  )
}

function Tooltip(props: any) {
  return(
    <span className="text-xs absolute w-fit bg-zinc-500 p-1 rounded-md mx-auto mt-[-30px] left-0 right-0 opacity-0 group-hover:opacity-100">{props.name}</span>
  )
}
function Tool(props: any) {
  return (
      <div 
        className="group relative cursor-pointer w-8 px-2 fill-zinc-400 aspect-square hover:bg-white/10 rounded-md"
        onClick={() => { props.handler(props.name) }}
  	  >
        <Tooltip name={props.name}/>
        {props.icon}
      </div>
  )
}

function Toolbox(props: any) {
  return (
    <div className="select-none outline outline-1 outline-zinc-300/20 h-fit rounded-md">
      <div className="bg-slate-400/10">
        <div className="p-4 gap-8 grid grid-cols-2">
          <Tool name={"bold"} icon={<Bold/>} handler={props.handleTool} />
          <Tool name={"italic"} icon={<Italic/>} handler={props.handleTool} />
          <Tool name={"quote"} icon={<Quote/>} handler={props.handleTool} />
          <Tool name={"list"} icon={<ListUl/>} handler={props.handleTool} />
          <Tool name={"title"} icon={<Title/>} handler={props.handleTool} />
          <Tool name={"link"} icon={<LinkAlt/>} handler={props.handleTool} />
          <Tool name={"image"} icon={<ImageAdd/>} handler={props.handleTool} />
        </div>
        <hr className="w-5/6 mx-auto border-white/10" />
        <div className="p-4 m-auto grid grid-cols-1 content-center">
          <PreviewBtn previewOn={props.previewOn} handler={props.handlePreview} />
          <SaveBtn />
        </div>
      </div>
    </div>
  )
}

function ActualImage(props: any) {
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
  	e.currentTarget.value = "";
  }
  return(
    <form
      className="group relative cursor-pointer text-sm w-32 aspect-square rounded-md flex flex-col justify-center items-center text-center"
      id={"image"}
    >
      <input 
        type="file"
        accept="image/*"
        className="absolute cursor-pointer opacity-0 h-full w-full z-10"
        onChange={props.handleImage}
        onClick={onClick}
      />
      <img 
        src={props.article_image} 
        className="rounded-md w-fit z-0 group-hover:grayscale group-hover:brightness-50"
      />
      <ImageAdd className="absolute w-12 aspect-square group-hover:opacity-100 opacity-0"/>
    </form>
  )
}

function AddImage(props: any) {
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
  	e.currentTarget.value = "";
  }
  return(
    <form 
      className="relative cursor-pointer hover:bg-slate-400/10 text-sm w-32 aspect-square outline outline-2 outline-zinc-300 rounded-md flex flex-col justify-center items-center text-center"
      id={"image"}
    >
      <input 
        type="file"
        accept="image/*"
        className="absolute cursor-pointer opacity-0 h-full w-full z-10"
        onChange={props.handleImage}
        onClick={onClick}
      />
      <ImageAdd className="w-12 aspect-square z-0"/>
      <p className="z-0">Add a image image...</p>
    </form>
  )
}

function WritingBoard(props: any) {
  return (
      <div className="h-full flex w-full gap-x-12">
        <div className="flex-1 flex flex-col justify-between gap-y-8 select-none">          
          <div className="flex flex-row gap-x-8 align-center content-center justify-evenly items-center">
            {
            	props.article_image
            	? <ActualImage 
            	    article_image={props.article_image}
            	    handleImage={props.handleImage}
            	  />
            	: <AddImage
            	    handleImage={props.handleImage}
            	  />
            }

            <div className="flex flex-col gap-y-4 justify-between w-full">
              <div>
                <label className="text-sm">Title:</label>
                <input 
                  id={"title"}
                  type="text" 
                  placeholder={"Title.."}
                  value={props.article_title}
                  onChange={props.handleTitle}
                  className="focus:bg-slate-400/10 bg-zinc-800/80 w-full p-2 outline outline-2 outline-zinc-300 rounded-md" 
                />
              </div>
              <div>
                <label className="text-sm">Caption:</label>
                <input 
                  id={"caption"}
                  type="text" 
                  placeholder={"Caption.."}
                  value={props.article_caption}
                  onChange={props.handleCaption}
                  className="focus:bg-slate-400/10 bg-zinc-800/80 w-full p-2 outline outline-2 outline-zinc-300 rounded-md" 
                />
              </div>
            </div>
          </div>

          <textarea
            id={"content"}
            type="text"
            placeholder={"Article content.."}
            value={props.article_content}
            onChange={props.handleContent}
            className="flex-1 focus:bg-slate-400/10 bg-zinc-800/80 p-2 outline outline-2 outline-zinc-300 rounded-md"
          >
            
          </textarea>
        </div>
        <Toolbox
          previewOn={props.previewOn}
          handlePreview={props.handlePreview}
          handleTool={props.handleTool}
        />
      </div>
  )
}

function PreviewBoard(props: any) {
  return (
      <div className="h-full flex w-full gap-x-12">
        <div className="flex-1 outline outline-2 outline-zinc-300 rounded-md">
	      <MarkdownArticle markdown={props.article_content} />
        </div>
        <div 
          className="select-none h-fit w-fit p-4 flex gap-x-3 items-center active:bg-[#6544c9] bg-[#393D45] rounded-md cursor-pointer"
          onClick={props.handlePreview}
        >
          <RemoveRedEye className="w-4 aspect-square"/>
          <p className="text-white text-sm">Exit preview</p>
        </div>
      </div>
  )
}

const Home: NextPage = () => {
  const [previewOn, setPreviewMode] = useState<React.ReactNode>(false);
  const [article_image, setImage] = useState<React.ReactNode>();
  const [article_title, setTitle] = useState<React.ReactNode>();
  const [article_caption, setCaption] = useState<React.ReactNode>();
  const [article_content, setContent] = useState<React.ReactNode>();

  function handlePreview(){
  	setPreviewMode(!previewOn);
  }

/*todo base64 img
  function handleImage(e){
  	setTitle(e.target.value);
  }
*/
  function handleTitle(e){
  	setTitle(e.target.value);
  }
  function handleCaption(e){
  	setCaption(e.target.value);
  }
  function handleContent(e){
  	setContent(e.target.value);
  }

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();  
      fileReader.readAsDataURL(file);  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  async function handleImage(e){
    const image_base64 = await toBase64(e.target.files[0] as File);
    setImage(image_base64 as string);
  }

  function handleTool(tool){
  	// get the selected text if any, else get the actual cursor position 
    let content = document.getElementById("content");
    let start = content.selectionStart;
    let end = content.selectionEnd;
    // check to remove the backspace at the end automatically selected after a double-clic
    if(content.value.substring(end - 1, end) == ' '){
    	end = end - 1;
    }
    // get the tag delimiter
    var delimiter_start;
    var delimiter_end;
    switch(tool) {
      case 'bold':
        delimiter_start = '**'
        delimiter_end = delimiter_start
        break
      case 'italic':
        delimiter_start = '*'
        delimiter_end = delimiter_start
        break
      case 'quote':
        delimiter_start = '\n> '
        delimiter_end = ''
        break
      case 'list':
        delimiter_start = '\n - '
        delimiter_end = ''
        break
      case 'title':
        delimiter_start = '# '
        delimiter_end = ''
        break
      case 'link': //todo
        delimiter_start = '# '
        delimiter_end = ''
        break
      case 'image': //todo
        delimiter_start = '# '
        delimiter_end = ''
        break
      default:
        break
    }

    // 2 cases:
    // the user clicked the tool button for the first time -> apply the tag
    //                                  for the second time -> remove the tag
    var newText;
    var newSelectionStart;
    var newSelectionEnd;
    if(
		content.value.substring(start - delimiter_start.length, start) == delimiter_start
		&&
		content.value.substring(end, end + delimiter_end.length) == delimiter_end
	){
		// 2nd click, need to remove the tags
    	newText = content.value.substring(0, start - delimiter_start.length) + content.value.substring(start, end) + content.value.substring(end + delimiter_end.length); 
		newSelectionStart = start - delimiter_start.length;
		newSelectionEnd = end - delimiter_end.length;
	} else {
		// 1st click, need to add the tags
	    let selectedText = content.value.substring(start, end);
	    newText = content.value.substring(0, start) + delimiter_start + selectedText + delimiter_end + content.value.substring(end);
		newSelectionStart = start + delimiter_start.length;
		newSelectionEnd = end + delimiter_start.length;
	}
    content.value = newText;
    content.focus();
    content.selectionStart = newSelectionStart;
    content.selectionEnd = newSelectionEnd;
    setContent(newText);
  }
  return (
    <div className="h-full w-full flex justify-between gap-x-16">
    {
      previewOn 
        ? <PreviewBoard 
            article_content={article_content}
            handlePreview={handlePreview}
          />
        : <WritingBoard
            article_image={article_image}
            article_title={article_title}
            article_caption={article_caption}
            article_content={article_content}
            previewOn={previewOn}
            handlePreview={handlePreview}
            handleTitle={handleTitle}
            handleCaption={handleCaption}
            handleContent={handleContent}
            handleImage={handleImage}
            handleTool={handleTool}
          />
    }
    </div>
  );
};

export default Home;
