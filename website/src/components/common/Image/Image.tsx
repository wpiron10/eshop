import React, { FC } from "react";

interface ImageProps {
	src: string;
	dimensions?: string;
	className?: string;
	alt?: string;
	onClick?: () => void;
}

const Image = ({
	src,
	dimensions,
	className,
	alt,
}: ImageProps): JSX.Element => (
	<img
		src={src}
		alt={alt}
		width={dimensions}
		height={dimensions}
		className={className}
	/>
);

export default Image;
