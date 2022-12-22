import { invalid } from '@sveltejs/kit';

/*********************************************************************************/
// DUMMY DATA: THEY COULD ALSO BE MOVED TO ANOTHER SEPERATE FILE
/******************************************************************************* */
let replies = [];
let comments = [
	{
		id: 'de393e6a-1c08-4e6e-9aad-0994fcf0d981',
		username: 'Mayanna Jill',
		comment: 'Luxury in design! Amazing.',
		replyTo: ''
	},
	{
		id: 'de393e6a-1c08-4e6e-9aad-0994fcf0d321',
		username: 'Roshan Katel',
		comment: 'The classic color combination.',
		replyTo: ''
	}
];
let liked = {
	status: false
};

// FUNCTION: LOADS DATA BOTH IN BOTH SERVER AND IN THE BROSWER
export const load = () => {
	return {
		comments,
		replies,
		liked
	};
};

// ACTION: HANDLING FORM
export const actions = {
	// THIS FUNCTION CREATES A COMMENT, IT COULD ALSO BE A REPLY TO A COMMENT
	create: async ({ request }) => {
		// TODO: CREATE A SEPERATE HELPER FUNCTION TO PARSE ALL THE FORM DATA
		const formData = await request.formData();
		const comment = formData.get('comment_input');
		const replyFor = formData.get('replyFor');

		// TODO: CREATE A FORM VALIDATOR FUNCTION THAT WORKS THROUGHOUT THE PROJECT
		if (comment.length < 1) {
			return invalid(400, {
				error: true,
				message: 'Oops! empty comments are not allowed.',
				comment
			});
		}
		const id = crypto.randomUUID(); //CREATES A RANDOM UUID
		const username = 'You';
		const replyTo = replyFor;
		const new_comment = {
			id,
			username,
			comment,
			replyTo
		};
		comments.push(new_comment);
		replies = comments.filter((item) => item.replyTo !== '');

		return {
			success: true
		};
	},

	// THIS FUNCTION OPERATES TO EITHER LIKE OR DISLIKE THE POST
	handleLike: async ({ request }) => {
		// TODO: CREATE A SEPERATE HELPER FUNCTION TO PARSE ALL THE FORM DATA
		const formData = await request.formData();
		const liked_status = formData.get('id');

		if (liked_status === 'false') {
			liked = {
				status: true
			};
		} else {
			liked = {
				status: false
			};
		}

		return {
			success: true
		};
	}
};
