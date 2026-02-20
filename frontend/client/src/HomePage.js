import React from 'react'
import {BrowserRouter, Link} from "react-router-dom"
const HomePage = () => {
  return (
    <div style={{"text-align": "center"}}>
      <h1>Hello!</h1>
      <span>This is a home page of my project "NoteOrganizer"</span>
      <br/>
      <span>Here is a link to Github repository of this project: <a target="_blank" style={{"color":"rgb(17, 71, 185)"}} href='https://github.com/stas-shdev/NoteOrganizer'>NoteOrganizer</a></span>
      <br/>
      <span>And here is link to main part of this app: </span>
      <Link to={"/App"} style={{"color":"rgb(17, 71, 185)"}}>Go to App</Link>
      <br/>
      <span>In the future, this page also will be navigating users to login page</span>
      <br/>
      <span>(This page was created to test how library "React-Router" works in development and production)</span>
    </div>
  )
}

export default HomePage
