import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.scss";

export const FloatButtonHome: React.FC = () => (
	<div className="overlay-container">
		<div className="container">
			<Link to="/" className="float-button-home">
				<FaHome size={25} />
			</Link>
		</div>
	</div>
);
