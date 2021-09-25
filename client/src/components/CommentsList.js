import CommentShow from "./CommentShow"

export default function CommentsList({ comments, user, allUsers, onDeleteComment }) {

	const parentComments = comments.filter((c) => c.parent_comment_id === null)
	const replies = comments.filter((c) => c.parent_comment_id !== null)
	const renderComments = parentComments.map((c) => <CommentShow key={c.id} comment={c} user={user} allUsers={allUsers} replies={replies} onDeleteComment={onDeleteComment} />)

	return (
		<div>
			{renderComments}
		</div>
	)
}