import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    // Check if integer and the actual number.
	if (parseInt(params.num) < 18 && parseInt(params.num) > 0) {
		return {
			title: "SDG " + params.num,
			content: params.num
		};
	}

	error(404, 'Not found');
};