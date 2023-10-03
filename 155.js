function _transformMeasurements () {
        // Append the SVG dom to the document.
        // This allows us to use `getBBox` on the page,
        // which returns the full bounding-box of all drawn SVG
        // elements, similar to how Scratch 2.0 did measurement.
        const svgSpot = document.createElement('span');
        // Clone the svg tag. This tag becomes unusable/undrawable in browsers
        // once it's appended to the page, perhaps for security reasons?
        const tempTag = this._svgTag.cloneNode(/* deep */ true);
        let bbox;
        try {
            svgSpot.appendChild(tempTag);
            document.body.appendChild(svgSpot);
            // Take the bounding box.
            bbox = tempTag.getBBox();
        } finally {
            // Always destroy the element, even if, for example, getBBox throws.
            document.body.removeChild(svgSpot);
            svgSpot.removeChild(tempTag);
        }

        // Enlarge the bbox from the largest found stroke width
        // This may have false-positives, but at least the bbox will always
        // contain the full graphic including strokes.
        // If the width or height is zero however, don't enlarge since
        // they won't have a stroke width that needs to be enlarged.
        let halfStrokeWidth;
        if (bbox.width === 0 || bbox.height === 0) {
            halfStrokeWidth = 0;
        } else {
            halfStrokeWidth = this._findLargestStrokeWidth(this._svgTag) / 2;
        }
        const width = bbox.width + (halfStrokeWidth * 2);
        const height = bbox.height + (halfStrokeWidth * 2);
        const x = bbox.x - halfStrokeWidth;
        const y = bbox.y - halfStrokeWidth;

        // Set the correct measurements on the SVG tag
        this._svgTag.setAttribute('width', width);
        this._svgTag.setAttribute('height', height);
        this._svgTag.setAttribute('viewBox',
            `${x} ${y} ${width} ${height}`);
    }