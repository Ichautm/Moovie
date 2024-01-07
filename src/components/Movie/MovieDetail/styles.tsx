import styled from "@emotion/styled";

interface MovieHeaderProps {
	bgImage: string;
}

export const MovieHeader = styled.div<MovieHeaderProps>`
	position: relative;
	background-image: url(${(props) => props.bgImage});
	background-size: cover;
	background-repeat: no-repeat;
	height: 450px;

	@media screen and (max-width: 768px) {
		min-height: 800px;
	}

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 1;
	}
`;

export const MovieImage = styled.img`
	width: 200px;
	height: 300px;
	border-radius: 6px;
	object-fit: cover;
`;
