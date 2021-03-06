import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { PageHeader, Panel, Label } from 'react-bootstrap';

import { fetchPosts } from '../actions/index';

import Post from './Post';

class PostList extends Component {
    componentWillMount() {
	/* console.log(">>>> src/components/post_list.js:");
	   console.log("Calling fetchPosts() action creator.");		*/
	/* Fetch posts when the app loads */
	this.props.fetchPosts(this.props.params.category);
    }

    componentWillReceiveProps(nextProps) {
	if (nextProps.params.category !== this.props.params.category) {
	    /* If the route has changed - refetch the posts. */
	    /* Gotta check if route is different.
	       Without the if statement it will fetch posts,
	       which will update props, which will fetch them again,
	       in infinite loop. */
	    this.props.fetchPosts(this.props.params.category);
	}
    }

    renderPosts() {
	const posts = this.props.posts.results;
	/* console.log(">>>> src/components/post_list.js:");
	   console.log("Rendering posts.");		*/

	if (!posts) {
	    return (
		<div></div>
	    );
	};
	return posts.map((post) => {
	    return (
		<Post key={post.slug}
		      title={post.title}
		      body={post.body}
		      tags={post.tags}
		      truncate={100}
		      link={`post/${post.slug}`}/>
	    )
	});
    }
    render() {
	return (
	    <div>
		{ this.renderPosts() }
	    </div>
	);
    }
}


function mapStateToProps(state) {
    return { posts: state.posts.all };
}
/* First argument allows to access state */
/* Second allows to fire actions */
export default connect(mapStateToProps, { fetchPosts })(PostList);
