"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
    const [input, setInput] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [error, setError] = useState({
        email: false,
        required: false,
    });

    const checkRequired = () => {
        if (input.email && input.message && input.name) {
            setError({ ...error, required: false });
        }
    };

    const handleSendMail = async (e) => {
        e.preventDefault();
        if (!input.email || !input.message || !input.name) {
            setError({ ...error, required: true });
            return;
        } else if (error.email) {
            return;
        } else {
            setError({ ...error, required: false });
        }

        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const options = { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY };

        try {
            const res = await emailjs.send(serviceID, templateID, input, options);

            if (res.status === 200) {
                toast.success("Message sent successfully!");
                setInput({
                    name: "",
                    email: "",
                    message: "",
                });
            }
        } catch (error) {
            toast.error(error?.text || error);
        }
    };

    const fieldClass =
        "nm-field w-full rounded-xl px-4 py-3 text-sm text-nm-text transition-shadow duration-200";

    return (
        <div className="nm-surface rounded-[22px] p-6 shadow-nm-raised sm:p-8">
            <p className="mb-1 text-lg font-extrabold text-nm-text">Send a message</p>
            <p className="mb-6 text-xs leading-relaxed text-nm-muted">
                Tell me what you are building, what is currently blocked, and the outcome you need.
                Shopify themes, custom apps, integrations, full-stack systems, and production fixes
                are all welcome.
            </p>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="nm-label">Your Name</label>
                    <input
                        className={fieldClass}
                        type="text"
                        maxLength="100"
                        required
                        placeholder="Jane Doe"
                        onChange={(e) => setInput({ ...input, name: e.target.value })}
                        onBlur={checkRequired}
                        value={input.name}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="nm-label">Your Email</label>
                    <input
                        className={fieldClass}
                        type="email"
                        maxLength="100"
                        required
                        placeholder="jane@example.com"
                        value={input.email}
                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                        onBlur={() => {
                            checkRequired();
                            setError({ ...error, email: !isValidEmail(input.email) });
                        }}
                    />
                    {error.email && (
                        <p className="text-xs text-nm-muted">Please provide a valid email!</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="nm-label">Your Message</label>
                    <textarea
                        className={fieldClass}
                        maxLength="500"
                        name="message"
                        required
                        rows="5"
                        placeholder="Project type, current setup, scope, timeline, and the main problem to solve…"
                        onChange={(e) => setInput({ ...input, message: e.target.value })}
                        onBlur={checkRequired}
                        value={input.message}
                    />
                </div>

                {error.required && (
                    <p className="text-xs text-nm-muted">Name, email and message are required!</p>
                )}

                <button
                    className="nm-btn mt-1 w-full py-3.5"
                    role="button"
                    onClick={handleSendMail}
                >
                    <span>Send Message</span>
                    <TbMailForward size={18} />
                </button>
            </div>
        </div>
    );
}

export default ContactForm;
