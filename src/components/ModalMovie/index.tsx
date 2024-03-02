import React from "react";
import "./style.scss";

interface IModalMovieProps {
	trailerKey: string;
	onClose: () => void;
	isOpen: boolean;
}

export const ModalMovie: React.FC<IModalMovieProps> = ({ trailerKey, onClose, isOpen }) => (
	<>
		{isOpen && (
			<div className="modal">
				<div className="modal-overlay" onClick={onClose} />
				<div className="modal-content k-bg-black">
					<button className="modal-close-btn" onClick={onClose}>
						&times;
					</button>
					<div className="modal-body">
						<iframe
							className="modal-iframe"
							width="100%"
							height="100%"
							src={`https://www.youtube.com/embed/${trailerKey}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							frameBorder="0"
						/>
					</div>
				</div>
			</div>
		)}
	</>
);
