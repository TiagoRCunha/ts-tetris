export function drawText(text: string, color: string, weight: string, alignment: CanvasTextAlign, size: number, left: number, top: number, context: CanvasRenderingContext2D) {
	context.font = weight + ' ' + size + 'px "Jura", sans-serif';
	context.textAlign = alignment;
	context.fillStyle = color;
	context.fillText(text, left, top);
}

export function colorWithAlpha(color: string, alpha: number) {
	var rgb = color.substring(4, color.length - 1);

	return `rgba(${rgb},${alpha})`;
}