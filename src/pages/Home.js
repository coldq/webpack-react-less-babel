import React from 'react';
import '../styles/contentContainer.less'
import logo3 from '../image/sunflower.svg';
// import Logo from 'material-ui/svg-icons/content/send';

const Header = React.createClass({
	render(){
		return(
			<div className="homeHeader">			
				<img src={logo3} className="home-logo" alt="logo" />
				<h1>Fate Wolrd</h1>
				<p>A Set of React Components that Implement
				<br/>Google's Material Design </p>
				
			</div>
		);
	}
})
const Intro = React.createClass({
	render(){
		return(
			<div className="Intro">			
				<p>
				Material-UI came about from our love of&nbsp;<a href="http://facebook.github.io/react/">React</a>
				 and&nbsp;
				 <a href="https://www.google.com/design/spec/material-design/introduction.html">Google's Material Design</a>
				 . We're currently using it on a project at&nbsp;
				<a href="https://www.call-em-all.com/Careers">Call-Em-All</a>
				 and plan on adding to it and making it better in the coming months.
				 </p>
				
			</div>
		);
	}
})

export default class Home extends React.Component {
	render(){
		return(
			<div className="home">
				<Header />
				<Intro/>
				
			</div>

		);
	}
}