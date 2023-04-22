// SEARCH '//todo' to find WIP items
//todo auto-save periodically (like immunefi reports)

// pages/news/index.tsx
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bold, Italic, LinkAlt, ImageAdd, Save, ListUl } from "styled-icons/boxicons-regular";
import { Title } from "styled-icons/material";
import { Quote } from "styled-icons/bootstrap";
import { RemoveRedEye } from "styled-icons/material-outlined";
import MarkdownArticle from "../../components/news/MarkdownArticle";
import ArticleCard from "../../components/news/ArticleCard";

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

function CardPreview(props: any) {
  const data = `### ${props.article_title}\n${props.article_caption}`;
  return (
    <ArticleCard
      image={props.article_image}
      data={data}
      link={null}
      isNew
    />
  )
}

function PreviewBoard(props: any) {
  return (
      <div className="h-full flex w-full gap-x-12">
        <div className="flex-1">
          <h1 className="text-5xl">{props.article_title}</h1>
          <p className="text-md text-zinc-500 italic py-2">{props.article_caption}</p>
          <img className="max-h-96 m-auto" src={props.article_image}/>
	      <MarkdownArticle markdown={props.article_content} />
	      <br/>
        </div>
        <div className="h-fit w-fit select-none">
          <div 
            className="p-4 flex gap-x-3 items-center active:bg-[#6544c9] bg-[#393D45] rounded-md cursor-pointer"
            onClick={props.handlePreview}
          >
            <RemoveRedEye className="w-4 aspect-square"/>
            <p className="text-white text-sm">Exit preview</p>
          </div>
          <div>
            <p className="mt-8 mb-2 text-white text-sm">Article card preview:</p>
            <CardPreview
              article_image={props.article_image}
              article_title={props.article_title}
              article_caption={props.article_caption}
            />
          </div>
        </div>
      </div>
  )
}

const Home: NextPage = () => {
  const [previewOn, setPreviewMode] = useState<React.ReactNode>(false);
  var test = 'data:image/webp;base64,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';
  const [article_image, setImage] = useState<React.ReactNode>(test);
  const [article_title, setTitle] = useState<React.ReactNode>('The Kaiju Renaissance');
  const [article_caption, setCaption] = useState<React.ReactNode>('Artists spotlight and community initiatives');
  const [article_content, setContent] = useState<React.ReactNode>('This week has been nothing short of action-packed for the Kaiju Kings! One of the most notable events is the community initiative focused on supporting artists. Twitter has been flooded with awe-inspiring community augments, as artists vie for the coveted opportunity to add their art to Augments Season three. Dots, the founder of Kaiju Kings, has also been at the forefront, championing fellow creators and extending support to other talented individuals within the community.\n\n## Community Spotlights\nAs the bull market approaches, the KaijuDex team remains dedicated to showcasing the finest talent in the space. This week, we are honored to feature three exceptional creators who are at the forefront, ushering in the illustrious Kaiju Golden Age.');

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
            article_image={article_image}
            article_title={article_title}
            article_caption={article_caption}
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
