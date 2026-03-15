import MyButton from './UI/MyButton/MyButton'

const GroupManager = ({ groupInfo, deleteUserFromGroupFunc, startEditGroup,setDeleteFlag,navigate}) => {
  return (
    <div>
      <h1>Title of Group:{groupInfo.groupTitle}</h1>
      <MyButton onClick={()=>{startEditGroup(groupInfo.groupTitle)}}>Edit Title</MyButton>
      <h2>Members of this group:</h2>
      {[...groupInfo.users??[]].map((user,index) => {
        return (
          <div>
            <div className="postItem">
              <div className="post-Content">
                <strong>{index + 1}. {user.username}</strong>
                <div className="post-paragraph">user</div>
              </div>
              <div className="post-btnBox">
                <MyButton onClick={() => { deleteUserFromGroupFunc(user.userId, groupInfo.groupId) }}>Delete</MyButton>
              </div>
            </div>
          </div>)
      })}
      <MyButton onClick={setDeleteFlag}>Delete this Group</MyButton>
      <MyButton onClick={()=>{navigate('/App')}}>Go To App</MyButton>
    </div>
  )
}

export default GroupManager
