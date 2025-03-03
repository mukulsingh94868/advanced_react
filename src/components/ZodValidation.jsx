import React, { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

const ZodValidation = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);

        const result = schema.safeParse(data);

        if (!result.success) {
            // Extract errors
            const formattedErrors = result.error.format();
            setErrors({
                name: formattedErrors.name?._errors[0] || "",
                email: formattedErrors.email?._errors[0] || "",
                password: formattedErrors.password?._errors[0] || "",
            });
        } else {
            setErrors({});
            console.log("Form Submitted:", data);
            alert("Form submitted successfully!");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={data.name} required onChange={handleChange} />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={data.email} required onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={data.password} required onChange={handleChange} />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default ZodValidation