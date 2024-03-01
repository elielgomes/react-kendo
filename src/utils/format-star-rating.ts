export const formatStarRating = (rating = 0): string[] => {
	const star = Number(rating) / 2;
	const arrStars = [];
	const starHalf = star.toFixed(1);

	for (let i = 1; i < star; i++) {
		arrStars.push("Full");
	}

	if (Number(starHalf[2]) >= 3 && Number(starHalf[2]) <= 6) {
		arrStars.push("Half");
	} else if (Number(starHalf[2]) >= 8) {
		arrStars.push("Full");
	}

	for (let j = 1; arrStars.length < 5; j++) {
		arrStars.push("Void");
	}

	return arrStars;
};
