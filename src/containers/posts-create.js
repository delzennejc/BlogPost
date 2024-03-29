import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import { Link, browserHistory } from 'react-router';

class PostsCreate extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props){
    this.props.createPost(props)
      .then((res) => {
        browserHistory.push('/');
      });
  }

  render(){
    const { handleSubmit, fields: { title, categories, content } } = this.props;

    return (
      <form onSubmit={handleSubmit((props) => this.onSubmit(props))}>
        <h3>Create a new post</h3>

        <div className={`form-group ${title.touched && title.invalid && 'has-danger'}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title}/>
          <div className="text-help">{title.touched && title.error}</div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid && 'has-danger'}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">{categories.touched && categories.error}</div>
        </div>

        <div className={`form-group ${content.touched && content.invalid && 'has-danger'}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">{content.touched && content.error}</div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {}
  if(!values.title){
    errors.title = 'Enter a username';
  }
  if(!values.categories){
    errors.categories = "Enter a categorie";
  }
  if(!values.content){
    errors.content = "Enter a content";
  }

  return errors;
}

export default reduxForm({
  form: 'PostCreate',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsCreate);
