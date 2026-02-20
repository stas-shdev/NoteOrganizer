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
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [posts, setPosts] = useState([]);

  const getAll=async (end)=>{
    await fetch(`${process.env.REACT_APP_API_URL}/posts`).then(result=>result.json()??[]).then(takenPosts=>{setPosts(takenPosts)}).catch(err=>{throw new Error(err)});
    end()
  }
  const [getAllPosts,isLoadingPosts,errorPosts,completeLoading]=useFetching(()=>{getAll(completeLoading)})
  useEffect(getAllPosts,[])

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
    await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify({ title: name, body: paragraph, group: groupForPaste })
    }).then(res => res.json()).then(data => {
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
    fetch(`${process.env.REACT_APP_API_URL}/posts?id=${idForDelete}`,{
      method: "DELETE"
    }).then(res=>{console.log(res.ok)})
  };
  
  const deleteGroup = (idForDelete) => {
    const copyOfPosts = [...posts]
    copyOfPosts.splice(copyOfPosts.findIndex(elem=>elem.group_id==idForDelete),1)
    setPosts(copyOfPosts)
    fetch(`${process.env.REACT_APP_API_URL}/group?id=${idForDelete}`,{
      method: "DELETE"
    }).then(res=>{console.log(res.ok)})
  }

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
    const idEdit=editId.current;
    const groupIdEdit=editGroup.current;
    const postGroupEdit = [...posts];
    const EditedPosts = postGroupEdit[postGroupEdit.findIndex(group => group.group_id === groupIdEdit)].posts
    const neededResult = { "id": idEdit, "title": editTitle, "body": editBody }
    EditedPosts[EditedPosts.findIndex(post => post.id === idEdit)] = neededResult;
    editId.current = '';
    editGroup.current = '';
    setPosts(postGroupEdit);
    setEditFlag("none");
    fetch(`${process.env.REACT_APP_API_URL}/posts`,{
      method: "PUT",
      body: JSON.stringify({
        id:idEdit,
        title:editTitle,
        body: editBody
      })
    })
  }
  const [createGroupFlag, setCreateGroupFlag] = useState('none')
  const [groupTitle, setGroupTitle] = useState('')

  const createNewGroup = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/group`, {
      method: 'POST',
      body: JSON.stringify({ titlePostList: groupTitle })
    }).then(res => res.json())
      .then(data => { setPosts([...posts, { group_id: data['AnswerId'], group_title: groupTitle, posts: [] }]); console.log(data) })
      .catch(err => { console.log(err) })
    setCreateGroupFlag('none')
    setGroupTitle("")
  }

  const [editTitleGroup, setEditTitleGroup] = useState('');
  const editGroupId = useRef('')
  const [groupEditFlag, setGroupEditFlag]=useState("none")

  const startEditGroup = (groupId, title) => {
    setGroupEditFlag("flex");
    editGroupId.current = groupId;
    setEditTitleGroup(title)
  };
  const completeEditGroup = () => {
    const edittedGroup=editGroupId.current;
    const postGroupEdit = [...posts];
    postGroupEdit[postGroupEdit.findIndex(group => group.group_id === edittedGroup)].group_title = editTitleGroup
    setPosts(postGroupEdit);
    editId.current = '';
    editGroup.current = '';
    setGroupEditFlag("none");
    fetch(`${process.env.REACT_APP_API_URL}/group`,{
      method: "PUT",
      body: JSON.stringify({
        group_id:edittedGroup,
        group_title:editTitleGroup,
      })
    })
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

      <MyModalWindow flag={createGroupFlag} setFlag={(flag)=>{setCreateGroupFlag(flag)}}>
        <MyInput value={groupTitle} onChange={(e) => { setGroupTitle(e.target.value) }}></MyInput>
        <MyButton onClick={createNewGroup}>Create group</MyButton>
      </MyModalWindow>

      <MyModalWindow flag={groupEditFlag} setFlag={(flag)=>{setGroupEditFlag(flag)}}>
        <MyInput value={editTitleGroup} onChange={(e)=>{ setEditTitleGroup(e.target.value)}}></MyInput>
        <MyButton onClick={completeEditGroup}>Change title of group</MyButton>
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

      <PostGroups
        postGroups={searchedSortedPosts}
        deleteGroup={(id)=>{deleteGroup(id)}}
        deleteFunc={(givenId, givenGroup) => { deletePost(givenId, givenGroup) }}
        editFunc={(idForEdit, indexGroup, title, body) => { editPost(idForEdit, indexGroup, title, body) }}
        editGroupFunc={(id,title)=>{startEditGroup(id,title)}}
        createPost={(index) => { startCreateNewPost(index) }}
        isLoads={isLoadingPosts}
        completeLoading={completeLoading}>
      </PostGroups>
    </div>
  )
}

export default App;
