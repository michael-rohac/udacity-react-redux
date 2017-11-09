/**
 * © 2017 Michal Rohac, All Rights Reserved.
 */
import React, {Component} from 'react';
import Post from './Post'
class Category extends Component {
    render() {
        const {category, posts} = this.props;
        return (
            <div>
                <h3 title={`Add post to ${category.name} category`}>Add Post</h3>
                {posts.map(post => (
                    <Post key={post.id} post={post}/>
                ))}
            </div>
        )
    }
}

export default Category