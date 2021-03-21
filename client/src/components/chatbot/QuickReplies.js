import React, { Component } from 'react';
import QuickReply from "./QuickReply";
class QuickReplies extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        console.log("=======> constructeur replies");
    }
    _handleClick(event, payload, text) {
        this.props.replyClick(event, payload, text);
        console.log("=======> click replies");
    }


    renderQuickReply(reply, i) {
        return <QuickReply key={i} click={this._handleClick} reply={reply} />;
        console.log("=======> render replies hedha component");
    }


    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, i) => {
                return this.renderQuickReply(reply, i);
                console.log("=======> render if");
                }
            )
        } else {
            return null;
            console.log("=======> render else");
        }
    }

    render() {
        return (
            <div className="col s12 m8 offset-m2 l6 offset-13">
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div className="row valign-wrapper">
                        <div className="col s2">
                            <a className="btn-floating btn-large waves-effect waves-light red">{this.props.speaks}</a>
                        </div>
                        <div id="quick-replies" className="col s10">
                            {this.props.text && <p>
                                {this.props.text.stringValue}
                            </p>
                            }
                            {this.renderQuickReplies(this.props.payload)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default QuickReplies;