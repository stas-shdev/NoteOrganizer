import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import "./styles/fonts.css"
import MyButton from "./components/UI/MyButton/MyButton";
import PostForm from "./components/PostForm";
import useSearchedSortedPosts from "./useSearchedSortedPosts";
import PostSortSearch from "./components/PostSortSearch";
import MyModalWindow from "./components/UI/ModalWindow.jsx/MyModalWindow";
import MyInput from "./components/UI/MyInput/MyInput";
import PostGroups from "./components/PostGroups";
import useFetching from "./useFetching";
import { useNavigate, Navigate } from "react-router-dom";
import api from './api/api.js'
import {QRCodeCanvas} from "qrcode.react"
import MyLoadingSign from "./components/UI/LoadingSign/MyLoadingSign.jsx";

function App() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);

  const getAll = async () => {
    try {
      const res = await api.get("/posts")
      console.log(res)
      setPosts(res.data)
    } catch (err) {
      if (err.response.status==401) {
        navigate("/")
      }
    }
  }
  const [getAllPosts, isLoadingPosts, errorPosts ] = useFetching(getAll)
  useEffect(()=>{getAllPosts()}, [])

  const [flag, setStateFlag] = useState("none");

  const [stateSort, setStateSort] = useState("");
  const [search, setSearch] = useState("")

  const searchedSortedPosts = useSearchedSortedPosts(posts, stateSort, search);

  const groupForPaste = useRef(0)

  const startCreateNewPost = (currentGroup) => {
    groupForPaste.current = currentGroup;
    setStateFlag("flex")
  }
  const createNewPost = async (name, paragraph, groupForPaste) => {
    // let TakenId = null
    await api.post(`/posts`, { title: name, body: paragraph, group: groupForPaste })
      .then(response => response.data)
      .then(data => {
        const CopyOfPosts = [...posts]
        CopyOfPosts[CopyOfPosts.findIndex(group => group.group_id === groupForPaste)].posts = [...CopyOfPosts[CopyOfPosts.findIndex(group => group.group_id === groupForPaste)].posts, { id: data['serverId'], title: name, body: paragraph }];
        setPosts(CopyOfPosts);
      })
    //to change
    setStateFlag("none")
  };

  const deletePost = (idForDelete, groupOfDeleting) => {
    const CopyOfPosts = [...posts]
    CopyOfPosts[CopyOfPosts.findIndex(group => group.group_id === groupOfDeleting)].posts = CopyOfPosts[CopyOfPosts.findIndex(group => group.group_id === groupOfDeleting)].posts.filter((post) => post.id !== idForDelete)
    setPosts(CopyOfPosts)
    api.delete(`/posts?id=${idForDelete}`)
      .then(res => { console.log(res.ok) })
  };

  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editFlag, setEditFlag] = useState("none")
  const editId = useRef('')

  const editGroup = useRef('')


  const editPost = (idForEdit, groupOfEdit, title, body) => {
    setEditFlag("flex");
    editId.current = idForEdit;
    editGroup.current = groupOfEdit
    setEditTitle(title)
    setEditBody(body)
  };
  const completeEditPost = () => {
    const idEdit = editId.current;
    const groupIdEdit = editGroup.current;
    const postGroupEdit = [...posts];
    const EditedPosts = postGroupEdit[postGroupEdit.findIndex(group => group.group_id === groupIdEdit)].posts
    const neededResult = { "id": idEdit, "title": editTitle, "body": editBody }
    EditedPosts[EditedPosts.findIndex(post => post.id === idEdit)] = neededResult;
    editId.current = '';
    editGroup.current = '';
    setPosts(postGroupEdit);
    setEditFlag("none");
    api.put(`/posts`, { id: idEdit, title: editTitle, body: editBody })
  }
  const [createGroupFlag, setCreateGroupFlag] = useState('none')
  const [groupTitle, setGroupTitle] = useState('')

  const createNewGroup = async () => {
    await api.post(`/group`, { titlePostList: groupTitle })
      .then(res => res.data)
      .then(data => { setPosts([...posts, { group_id: data['AnswerId'], group_title: groupTitle, posts: [] }]); console.log(data) })
      .catch(err => { console.log(err) })
    setCreateGroupFlag('none')
    setGroupTitle("")
  }


  const createInvite=async(groupId)=>{
    const link = await api.post('/createInviteLink',{invitedGroupId: groupId})
    setInviteLink(process.env.REACT_APP_INVITE_ADRESS+link.data.createdLink)
  }
  const [inviteLink, setInviteLink]= useState()
  const [inviteFlag, setInviteFlag] = useState('none')
  const [generateInviteLink, isInviteLinkLoading]=useFetching(createInvite)
  const navigateToGroup=(idOfGroup)=>{
    navigate(`/App/Group/${idOfGroup}`)
  }
  return (
    <div className="App">
      <MyModalWindow flag={flag} setFlag={(flag) => { setStateFlag(flag) }}>
        <PostForm create={(name, paragraph) => { createNewPost(name, paragraph, groupForPaste.current) }} />
      </MyModalWindow>

      <MyModalWindow flag={editFlag} setFlag={(flag) => { setEditFlag(flag) }}>
        <MyInput value={editTitle} onChange={(e) => { setEditTitle(e.target.value) }}></MyInput>
        <MyInput value={editBody} onChange={(e) => { setEditBody(e.target.value) }}></MyInput>
        <MyButton onClick={completeEditPost}>Safe Changes</MyButton>
      </MyModalWindow>

      <MyModalWindow flag={createGroupFlag} setFlag={(flag) => { setCreateGroupFlag(flag) }}>
        <MyInput value={groupTitle} onChange={(e) => { setGroupTitle(e.target.value) }}></MyInput>
        <MyButton onClick={createNewGroup}>Create group</MyButton>
      </MyModalWindow>

      <MyModalWindow flag={inviteFlag} setFlag={(flag)=>{setInviteFlag(flag); setInviteLink(null)}}>
        {isInviteLinkLoading?<MyLoadingSign>Invite link is loading</MyLoadingSign>:<div>
        <div style={{padding: "20px", backgroundColor: "white", borderRadius: "20px"}}>
        <QRCodeCanvas value={inviteLink}/>
        </div>
        <div>or</div>
        <MyButton onClick={()=>{navigator.clipboard.writeText(inviteLink)}}>click to copy link</MyButton></div>}
      </MyModalWindow>

      <MyButton onClick={() => { setCreateGroupFlag("flex") }}>Create New Group</MyButton>

      <PostSortSearch
        style={'display: flex; justify-content:space-between'}
        stateSort={stateSort}
        setStateSort={setStateSort}
        optionsForSort={[
          { title: "Sort by: title", value: "title" },
          { title: "Sort by: description", value: "body" }
        ]}
        searchValue={search}
        searchFunction={(e) => { setSearch(e.target.value) }} />

      {isLoadingPosts?<MyLoadingSign>Posts Is Loading</MyLoadingSign>:
      <PostGroups
        postGroups={searchedSortedPosts}
        deleteFunc={(givenId, givenGroup) => { deletePost(givenId, givenGroup) }}
        createPost={(index) => { startCreateNewPost(index) }}
        isLoads={isLoadingPosts}
        createInvite={(id)=>{generateInviteLink(id); setInviteFlag('flex');}}
        navigateToGroup={id=>{navigateToGroup(id)}}>
      </PostGroups>}
    </div>
  )
}

export default App;
