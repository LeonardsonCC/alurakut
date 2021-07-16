import styled from "styled-components";
import { formatDate } from "../../utils/date";

const Posts = ({ list }) => {
    return (
        <PostsList>
            {list.map(post => {
                return (
                    <li key={post.key}>
                        <div className="header">
                            <span>{post.creatorslug} disse:</span>
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <pre>
                            {post.text}
                        </pre>
                    </li>
                )
            })}
        </PostsList>
    )
}

const PostsList = styled.ul`
    li {
        list-style: none;
        background-color: #EEEEEE;
        padding: 20px;
        border-radius: 25px;
        margin-bottom: 10px;

        .header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            span {
                margin-bottom: 5px;
                font-size: 10px;
            }
        }
    }
`;

export default Posts;