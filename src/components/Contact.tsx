import React from "react";
import styles from "../style";

function Contact() {
    return (
        <div className="py-4 px-4 text-textlight dark:text-textdark w-full">
            <h2 className="mb-1 text-3xl tracking-tight font-extrabold">Contact Me</h2>
            <p>Want to reach out? Send me a message!</p>
            <form action="#" className="space-y-6 pt-3">
                <div>
                    <label for="email" className={styles.contactHeadings}>Your Email</label>
                    <input type="email" id="email" className={styles.formEntries} placeholder="name@email.com" required></input>
                </div>
                <div>
                    <label for="subject" className={styles.contactHeadings}>Subject</label>
                    <input type="text" id="subject" className={styles.formEntries} placeholder="What is it about?" required></input>
                </div>
                <div className="sm:col-span-2">
                    <label for="message" className={styles.contactHeadings}>Your Message</label>
                    <textarea id="message" rows="6" className={styles.formEntries} placeholder="Some details :)"></textarea>
                </div>
                <button type="submit" className="text-sm font-medium text-center rounded-lg bg-secondary dark:bg-secondarydark hover:bg-primary-800 text-textdark">Send Message</button>
            </form>
        </div>
    );
}


export default Contact;