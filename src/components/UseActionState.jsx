"use client";

import React, { useActionState } from "react";

// Define login function before using it inside useActionState
const login = async (prevState, formData) => {
    const username = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(username, email, password);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return updated state (you can modify this as per actual login API)
    return { data: { username, email, password }, error: null };
};

const UseActionState = () => {
    const [user, submitAction, isPending] = useActionState(login, {
        data: null,
        error: null,
    });

    console.log("user", user);

    return (
        <form action={submitAction}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />
            </div>
            <button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
            </button>

            {user?.data && <p>Welcome, {user.data.username}!</p>}
        </form>
    );
};

export default UseActionState;
