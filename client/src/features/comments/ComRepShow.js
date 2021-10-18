import { useState } from "react"
import { useHistory } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import TimeAgoContainer from "../shared/TimeAgoContainer"
import CommentEditForm from "./CommentEditForm"
import CommentType from "./CommentType"
import CommentNewForm from "./CommentNewForm"
import { destroyComment, patchComment } from "./commentsSlice"
import { Avatar, Grid, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCommentIcon from '@mui/icons-material/AddComment'


export default function ComRepShow({ comment, litTextId }) {
	const [editClicked, setEditClicked] = useState(false)
	const [replyClicked, setReplyClicked] = useState(false)
	const [errors, setErrors] = useState([])

	const dispatch = useDispatch() 

  const userState = useSelector((state) => state.user)
  const userId = userState.entities.length > 0 ? userState.entities[0].id : null

	const isParentQuestion = () => {
		if (comment.com_types.find(type => type.id === 2)) {
				return true
		} else {
			return false
		}
	}

	const history = useHistory()

	const showComment = {
		fullname: comment.user.fullname,
		username: comment.user.username,
		image: comment.user.image,
		content: comment.content,
		created_at: comment.created_at,
		updated_at: comment.updated_at,
		parent_comment_id: comment.parent_comment_id,
		deleted: comment.deleted,
		id: comment.id,
		com_types: comment.com_types
	}

	const deletedComment = {
		fullname: "",
		username: "",
		image: "https://ih1.redbubble.net/image.110003985.7172/flat,750x1000,075,f.u2.jpg",
		content: <em style={{ color: "#616161" }}>[this comment was deleted]</em>,
		created_at: comment.created_at,
		updated_at: comment.updated_at,
		parent_comment_id: comment.parent_comment_id,
		deleted: true,
		id: comment.id,
		com_types: []
	}

	const renderComment = comment.deleted ? deletedComment : showComment

	function handleDelete(e) {
		setEditClicked(prev => false)
		e.preventDefault()
		if (comment.replies.length > 0 || comment.parent_comment_id) {
			const changeCom = {
				...comment,
				deleted: true
			}
			dispatch(patchComment(changeCom))
		} else {
			let id = comment.id
			dispatch(destroyComment(id))
		}
	}

	function wrapSetErrors(data){
		setErrors(data)
	}

	function editButtonClick() {
		setEditClicked(!editClicked)
		setReplyClicked(false)
	}

	function replyButtonClick() {
		setReplyClicked(!replyClicked)
		setEditClicked(false)
	}

	const userClicked = () => {
		history.push(`/users/${comment.user.id}`)
	}

	const ghost = <span role="img" aria-label="ghost"> 👻 </span>

	return (
		<div style={{ position: "relative"}}>
		<Grid item xs={12} >
		<Grid container spacing={2} wrap="nowrap">
				{renderComment.deleted ? null : 
					<CommentType comTypes={renderComment.com_types} />
				}
			<Grid item >
				{renderComment.deleted ? 
					<Avatar sx={{ bgcolor: "#eee" }}>
						{ghost}
					</Avatar>
				: 
					<Avatar 
						alt={renderComment.fullname} 
						src={renderComment.image} 
						sx={{ cursor: "pointer", width: 60, height: 60, }} 
						onClick={() => userClicked()} 
					/>
				}
			</Grid>
			<Grid justifyContent="left" item xs={9}>
				<Typography 
					onClick={userClicked} 
					sx={{ cursor: "pointer", fontSize: 25, fontWeight: 401, mb: -1, pb: 0 }} 
				>
					{renderComment.fullname}
				</Typography>
				{renderComment.deleted ? null : 
				<Typography variant="subtitle2" onClick={userClicked} sx={{ cursor: "pointer", mt: 0, pt: 0, color: "#757575", fontWeight: 400 }} ><em>@{renderComment.username}</em></Typography>
				}
				<Typography variant="body1" sx={{ mt:2, mb:2 }}>
					{/* TO CHECK THAT REPLIES ARE RENDERING UNDER THE RIGHT COMMENT */}
					{/* <span style={{ fontSize: 10 }} >(
						<span>id: {renderComment.id}</span>
						{renderComment.parent_comment_id ? <span>, replying to: {renderComment.parent_comment_id}</span>: null}) 
					</span> */}
					{renderComment.content}
				</Typography>	
				<TimeAgoContainer 
					created_at={renderComment.created_at} 
					updated_at={renderComment.updated_at} 
					isDeleted={renderComment.deleted} 
				/>
			</Grid>
			</Grid>
			<Grid item xs={12}>
				{errors ? errors.map((e) => <div>{e}</div>) : null}
				<div style={{ position: "relative" }}>
					{!renderComment.parent_comment_id && !renderComment.deleted ?
            <Tooltip title="Reply" arrow>
							<AddCommentIcon size="large" sx={{ color: "#757575", ml:9, mt:2, mb:1 }} onClick={replyButtonClick}/> 
						</Tooltip>
					: null}
					{parseInt(comment.user.id) === parseInt(userId) && !renderComment.deleted ? 
						<div style={{ justifyContent: "right" }} >
							<Tooltip title="Delete" arrow >
								<DeleteIcon size="large" sx={{ color: "#732626", position: "absolute", right: 45, bottom: 5, mt:2, mb:1 }} onClick={handleDelete} /> 
							</Tooltip>
							<Tooltip title="Edit" arrow >
								<EditIcon size="large" sx={{ color: "#757575", position: "absolute", right: 5, bottom: 5, mt:2, mb:1  }} onClick={editButtonClick} /> 
							</Tooltip>
							{!renderComment.parent_comment_id ? null: <AddCommentIcon sx={{ visibility: "hidden", mt:2, mb:2}} />}
							</div>
					: null}					
				</div>
				{editClicked ? 
					<CommentEditForm 
						comment={comment}
						editButtonClick={editButtonClick}
						wrapSetErrors={wrapSetErrors}
					/> 
				: null}
				{replyClicked ? 
					<CommentNewForm 
						litTextId={litTextId} 
						parentCommentId={comment.id} 
						replyButtonClick={replyButtonClick} 						
						isParentQuestion={isParentQuestion()}
					/>
				: null} 

			</Grid>
		</Grid>	
		</div>
	)
}
