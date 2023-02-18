import React from "react";
export interface SVGIconProps {
	className?: string;
	color?: string;
	dimensions?: string;
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}
