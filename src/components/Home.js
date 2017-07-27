import React,{PureComponent} from 'react';
import ArticleList from '../components/ArticleList/index';
import {Row, Pagination,Col} from 'antd';
import PropTypes from 'prop-types';

class Home extends PureComponent {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		this.props.actions.loadBlogs(this.props.currentPage);
	}
	change(page){
		this.props.actions.loadBlogs(page);
		this.props.actions.changePage(page);
	}
	render(){
		const {currentPage,blog} = this.props;
		const loading = blog.get('loading'),
			error = blog.get('error'),
			sum =  blog.get('data').get('sum'),
			bloglist =  blog.get('data').get('bloglist');
	
		let content =null;
		if(loading) content = <p className="center">Loading...</p>;
		if(bloglist){
			content = bloglist.map((item,index) => {				
				return <ArticleList key={index} item={item}/>;
			});
		}
		if(error)content = <p>{error}</p>;
		return(
			<Row type="flex" justify="center" style={{marginTop:'36px'}} >
				
				<Col xs={24} sm={24} md={20} lg={28} xl={16} >
					{content}
				</Col>

				{bloglist && <Col span={22} style={{textAlign:'center'}}>
					<Pagination current={currentPage} onChange={(page)=>this.change(page)} total={sum}  />
				</Col>}

			</Row>
			
		);
	}
}
Home.PropTypes = {
	actions:PropTypes.object.isRequired,
};

export default Home;