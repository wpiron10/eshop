import { SVGIconProps } from "./types";

const Close = ({ className, dimensions = "30px" }: SVGIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={dimensions}
		height={dimensions}
		className={className}
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2zm-.83 12.3c.29.29.29.77 0 1.06a.74.74 0 0 1-.53.22.74.74 0 0 1-.53-.22l-2.3-2.3-2.3 2.3a.74.74 0 0 1-.53.22.74.74 0 0 1-.53-.22c-.29-.29-.29-.77 0-1.06l2.3-2.3-2.3-2.3c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l2.3 2.3 2.3-2.3c.29-.29.77-.29 1.06 0s.29.77 0 1.06l-2.3 2.3 2.3 2.3z"
			fill="#292d32"
		/>
	</svg>
);

export default Close;
