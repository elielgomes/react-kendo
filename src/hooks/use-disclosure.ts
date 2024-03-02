import React from "react";

export const useDisclosure = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	const onOpen = () => setIsOpen(true);
	const onClose = () => setIsOpen(false);
	const onToggle = () => setIsOpen(!isOpen);

	return {
		isOpen,
		onOpen,
		onClose,
		onToggle,
	};
};
