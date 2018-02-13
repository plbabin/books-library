import React, { Component } from 'react';

import {observer} from 'mobx-react';

import Plus from 'react-icons/lib/fa/plus';
import Minus from 'react-icons/lib/fa/minus';
import Search from 'react-icons/lib/fa/search';

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
            <button className="btn" onClick={this.handleClick}>
                {icon} <span>{buttonLabel}</span>
            </button>);
    }

    render() {
        const linkableClass = this.props.linkable ? 'linkable' : '';
        return (
            <div className="hs-book">
                <div className="cover">
                    {this.renderActionButton()}
                    
                    <a onClick={this.handleCoverClick} className={linkableClass}>
                        <img src={this.props.image} alt=""/>
                        {this.props.linkable && <span className="cover-hover">{<Search size={40} />}</span>}
                    </a>
                </div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.author}</h2>
            </div>
        );
    }
}

export default Book;
