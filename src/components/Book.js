import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {observer} from 'mobx-react';

import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';
import Search from 'react-icons/lib/fa/search';

@observer
class Book extends Component {
    
    handleClick = (e) => {
        if(e){
            e.stopPropagation();
            e.preventDefault();
        }
        if(this.props.saved){
            this.props.onRemoveItem(this.props.id);
        }else{
            this.props.onAddItem(this.props.id);
        }
    }

    handleCoverClick = (e) => {
        if(e){
            e.preventDefault();
        }
        if(!this.props.linkable){
            return false;
        }
        this.props.onCoverClick(this.props.id);
    }

    renderActionButton(){
        let buttonLabel = 'add';
        let icon = <Plus size={11} />;
        if(this.props.saved){
            icon = <Minus size={11} />;
            buttonLabel = 'remove';
        }
        return (
            <button className="btn bl-book-action" onClick={this.handleClick}>
                {icon} <span>{buttonLabel}</span>
            </button>);
    }

    render() {
        const {title, image, author, linkable} = this.props;
        const linkableClass = linkable ? 'linkable' : '';
        return (
            <div className="bl-book">
                <div className="bl-book-cover">
                    {this.renderActionButton()}
                    
                    <a onClick={this.handleCoverClick} className={linkableClass}>
                        <img src={image} alt={title}/>
                        {linkable && <span className="cover-hover">{<Search size={40} />}</span>}
                    </a>
                </div>
                <h1>{title}</h1>
                <h2>{author}</h2>
            </div>
        );
    }
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    linkable: PropTypes.bool,
    image: PropTypes.string.isRequired,
    saved: PropTypes.bool,
    onAddItem: PropTypes.func,
    onRemoveItem: PropTypes.func.isRequired,
    onCoverClick: PropTypes.func,
};

export default Book;
