import React, {Component} from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import Heatmap from 'heatmapjs/build/heatmap.js'

class ReactHeatmap extends Component {

	constructor(props) {
		super(props);
		this.setData = this.setData.bind(this);
	}

	componentDidMount() {
		const { cont } = this.props;
		this.heatmap = Heatmap.create({
		  container: cont || ReactDOM.findDOMNode(this)
		  // container: ReactDOM.findDOMNode(this),
		  // opacity: .9,
		  radius: this.props.radius,
		});
		this.setData(this.props.max, this.props.data);
	}

	componentWillReceiveProps(newProps) {
		this.setData(newProps.max, newProps.data);
	}

	setData(max, data) {
		this.heatmap.setData({
		  max: max,
		  data: this.computeData(data)
		});
	}

	computeData(data) {
		const { cont } = this.props;
		if(this.props.unit === 'percent') {
			let container = {};
			container.width = cont.offsetWidth || ReactDOM.findDOMNode(this).offsetWidth;
			container.height = cont.offsetHeight || ReactDOM.findDOMNode(this).offsetHeight;
			return data.map(function(values, index) {
				return {
					x : Math.round(values.x/100 * container.width),
					y : Math.round(values.y/100 * container.height),
					value: values.value
				}
			})
		} else {
			return data;
		}
	}

	render () {
		return( 
			<div style={{width: '100%', height: '100%'}}></div>
		);
	}
}

ReactHeatmap.propTypes = {
	max : PropTypes.number,
	radius: PropType.number,
	data : PropTypes.array,
	unit : PropTypes.string
}

ReactHeatmap.defaultProps = {
	max: 5,
	data: [],
	unit: 'percent'
}

export default ReactHeatmap
