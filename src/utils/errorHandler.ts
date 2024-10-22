export const errorHandler = (error: unknown) => {
	if (error instanceof Error) {
		return new Error(error.message);
	} else {
		return new Error('An unexpected error occurred');
	}
};
