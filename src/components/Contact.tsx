import React, { useState } from "react";
import styles from "../style";

function Contact() {
    {/** Contact Submission Form **/}
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

  return (
    <div className="py-4 px-4 text-textlight dark:text-textdark w-full h-screen z-0">
        <h2 className="mb-1 text-3xl tracking-tight font-extrabold">Contact Me</h2>
        <p>Want to reach out? Send me a message!</p>
        <form className="space-y-6 pt-3 order-last" action="https://formspree.io/f/mnqywyok" method="POST">
            <div>
                <label htmlFor="email" className={styles.contactHeadings}>Your Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.formEntries} placeholder="YourName@email.com" required />
            </div>
            <div>
                <label htmlFor="subject" className={styles.contactHeadings}>Subject</label>
                <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={styles.formEntries} placeholder="What is it about?" required />
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className={styles.contactHeadings}>Your Message</label>
                <textarea name="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className={styles.formEntries} placeholder="Some details :)" required/>
            </div>
            <button type="submit" className="text-sm font-medium text-center rounded-lg bg-secondary dark:bg-secondarydark hover:bg-primary-800 text-textdark">Send Message</button>
        </form>
    </div>
    );
}

export default Contact;