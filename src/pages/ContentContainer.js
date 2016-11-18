import React, {Component} from 'react';

import '../styles/contentContainer.less'


/*
* 页面中主内容容器，子组件为Article和ArticleList
 */

export default class ContentContainer extends React.Component {
	constructor(props, context) {
    	super(props, context);
    	
   }
	render(){
		return(
			<div className={this.context.flag ?'contentContainer drawer-open':'contentContainer'}>
					{this.props.children}
            </div>

		);

	}
}
ContentContainer.contextTypes = {
  flag: React.PropTypes.bool
};