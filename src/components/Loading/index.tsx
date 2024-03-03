import React from "react";
import "./style.scss";

export const Loading: React.FC = () => (
	<div className="lds-container">
		<div className="lds-ripple">
			<div />
			<div />
		</div>
	</div>
);
