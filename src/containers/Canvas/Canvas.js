// DEPENDENCIES
import React, { Component } from 'react';

// STYLES
import { AppCanvas } from './Canvas.module.scss';

class Canvas extends Component {

	state = {
		width: 0,
		height: 0
	}

	// REFS
	appCanvas = React.createRef();

	componentDidMount = () => {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentDidUpdate = (prevProps, prevState) => (prevState !== this.state.width ? this.createCanvasBackground(this.appCanvas.current) : null)

	componentWillUnmount = () => window.removeEventListener('resize', this.updateWindowDimensions)

	updateWindowDimensions = () => this.setState({ width: window.innerWidth, height: window.innerHeight })

	createCanvasBackground = (canvas) => {
		const ctx = canvas.getContext('2d');
		const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
		ctx.rect(0, 0, canvas.width, canvas.height);
		this.addGradientBackground(gradient, ['#30cfd0', '#330867']);
		this.fillRectWithBackground(ctx, gradient);
		this.fillRectWithBackground(ctx, '#F9F9F9');
	}

	addGradientBackground = (el, colors) => {
		const arrOfColors = [...colors];
		arrOfColors.forEach((color, i) => el.addColorStop(i, color));
	}

	fillRectWithBackground = (el, color) => {
		el.fillStyle = color;
		if(color === '#F9F9F9') { el.filter = 'opacity(75%)'; el.globalCompositeOperation = 'hue'; }
		el.fill();
	}

    render() {
    	const { width, height } = this.state;
        return (
            <canvas className={AppCanvas} width={width} height={height} ref={this.appCanvas} />
        );
    }
}

export default Canvas;
