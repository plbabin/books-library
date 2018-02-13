import React, { Component } from 'react';

import {observer, inject} from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('books')
@withRouter
@observer
class Book extends Component {
    
    handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(this.props.saved){
            this.props.onRemoveItem(this.props.id);
        }else{
            this.props.onAddItem(this.props.id);
        }
    }

    handleCoverClick = (e) => {
        e.preventDefault();
        if(!this.props.linkable){
            return false;
        }
        this.prosp.history.push(`/details/${this.props.id}`);
    }

    render() {
        const buttonLabel = this.props.saved ? 'remove' : 'add';
        const linkableClass = this.props.linkable ? 'linkable' : '';
        return (
            <div className="hs-book">
                <div className="cover">
                    <button className="btn" onClick={this.handleClick}>{buttonLabel}</button>
                    <a onClick={this.handleCoverClick} className={linkableClass}>
                        <img src={this.props.image} alt=""/>
                    </a>
                </div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.author}</h2>
            </div>
        );
    }
}

export default Book;
