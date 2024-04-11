export const SubmitForm = (formData) => async (dispatch) => {
    dispatch({ type: 'SUBMIT_REQUEST' });

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    if (!isValidEmail(formData.email)) {
        dispatch({ type: 'SUBMIT_FAILURE', payload: 'Invalid email address. Please enter a valid email.' });
        return; 
    }

    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://django.aakscience.com/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
                user_type: formData.user_type,
                first_name: formData.first_name,
                last_name: formData.last_name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        const data = await response.json();

        dispatch({ type: 'SUBMIT_SUCCESS', payload: data });
    } catch (error) {
        console.error("Error message from server:", error.message);
        dispatch({ type: 'SUBMIT_FAILURE', payload: error.message });
    }
};
