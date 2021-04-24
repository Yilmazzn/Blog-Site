import { useState } from "react";
import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";

const BlogDetails = () => {

    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch('http://localhost:8000/blogs/' + id);
    const [delPending, setDelPending] = useState(false);
    const history = useHistory();

    const handleClick = () => {
        setDelPending(true);
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            setDelPending(false);
            history.push('/');
        });
    }

    return (  
        <div className="blog-details">
            { isPending && <div>Loading ... </div> }
            { error && <div>{ error }</div> }
            { blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    { !delPending && <button onClick={handleClick}>Delete</button> }
                    { delPending && <button disabled>Deleting...</button> }
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;