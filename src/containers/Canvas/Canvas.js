// DEPENDENCIES
import React, { Component, Fragment } from 'react';

// STYLES
import { bottomCanvas, topCanvas } from './Canvas.module.scss';

class Canvas extends Component {

	state = {
		width: 0,
		height: 0
	}

	// REFS
	calcRatio = this.calcRatio();
	bottomCanvas = React.createRef();
	topCanvas = React.createRef();
	size = window.devicePixelRatio;
	canvasBg;
	canvasPng;
	ctxBg;
	ctxPng;

	componentDidMount = async () => {
		this.canvasBg = this.bottomCanvas.current;
		this.canvasPng = this.topCanvas.current;
		this.ctxBg = this.canvasBg.getContext('2d');
		this.ctxPng = this.canvasPng.getContext('2d');
		window.onresize = () => this.updateWindowDimensions();
		await this.updateWindowDimensions();
		await this.addBackgroundElements(this.ctxPng);
	}

	componentDidUpdate = (prevProps, prevState) => (prevState !== this.state.width ? this.createCanvasBackground(this.canvasBg) : null)

	componentWillUnmount = () => window.removeEventListener('resize', this.updateWindowDimensions)

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth * this.calcRatio, height: window.innerHeight * this.calcRatio });
		this.addBackgroundElements(this.ctxPng)
	}

	createCanvasBackground = (canvas) => {
		const gradient = this.ctxBg.createLinearGradient(0, canvas.height, 0, 0);
		this.ctxBg.rect(0, 0, canvas.width, canvas.height);
		this.addGradientBackground(gradient, ['#30cfd0', '#330867']);
		this.fillRectWithBackground(this.ctxBg, gradient);
		this.fillRectWithBackground(this.ctxBg, '#F9F9F9');
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

	addBackgroundElements = (ctx) => {
		const data = ['<','>',',','...','</>','{}','[]','&&','===',
		'||','!()','=>','>=','<=','--','++',':','?',';'];
		for(let i = 0; i < 4; i++) {
			data.forEach(el => this.drawText(el, ctx));
		}
	}

	drawText = (el, ctx) => {
		const x = Math.random() * window.innerWidth * this.calcRatio;
		const y = Math.random() * window.innerHeight * this.calcRatio;
		const color = '#FFFFFF';
		const fontSize = '14pt';
		const font = `${fontSize} Inconsolata`;
		ctx.font = font;
		ctx.fillStyle = color;
   		ctx.fillText(`${el}`, x, y);
	}

	calcRatio() {
        let ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;
        return dpr / bsr;
    }

    render() {
    	const { width, height } = this.state;
        return (
        	<Fragment>
            	<canvas className={bottomCanvas} width={width} height={height} ref={this.bottomCanvas} />
            	<canvas className={topCanvas} width={width} height={height} ref={this.topCanvas} />
			</Fragment>
        );
    }
}

export default Canvas;
