"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, MapPin, Send, Facebook, Coffee } from "lucide-react";
import { profile } from "@/data/profile";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/media/press/thunderstorms-day7.jpg)" }}
      />
      <div className="absolute inset-0 bg-primary/85" />

      <div className="relative z-10 container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="label-text">11 — Contact</span>
            <h2 className="heading-lg mt-6 mb-6">Let&apos;s tell the next story together.</h2>
            <p className="body-lg mb-10">
              Media enquiries, collaborations, sponsorship conversations, or simply a message from the road — I&apos;d love to hear from you.
            </p>

            <div className="space-y-4">
              <a
                href={profile.social.email}
                data-cursor
                className="flex items-center gap-3 text-muted hover:text-sand transition-colors"
              >
                <Mail size={18} />
                <span>{profile.email}</span>
              </a>
              <div className="flex items-center gap-3 text-muted">
                <MapPin size={18} />
                <span>{profile.location}</span>
              </div>
              <a
                href={profile.social.support}
                data-cursor
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted hover:text-sand transition-colors"
              >
                <Coffee size={18} />
                <span>Support future expeditions</span>
              </a>
            </div>

            <div className="flex gap-6 mt-10">
              <a href={profile.social.instagram} data-cursor target="_blank" rel="noopener noreferrer" className="text-muted hover:text-sand transition-colors">
                <Instagram size={22} />
              </a>
              <a href={profile.social.youtube} data-cursor target="_blank" rel="noopener noreferrer" className="text-muted hover:text-sand transition-colors">
                <Youtube size={22} />
              </a>
              <a href={profile.social.facebook} data-cursor target="_blank" rel="noopener noreferrer" className="text-muted hover:text-sand transition-colors">
                <Facebook size={22} />
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <div className="p-10 border border-sand/20 text-center">
                <p className="text-xl font-light text-sand">Message sent.</p>
                <p className="text-muted mt-2">I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="name" className="label-text block mb-2">Name</label>
                  <input id="name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-off-white focus:border-sand/50 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="label-text block mb-2">Email</label>
                  <input id="email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-off-white focus:border-sand/50 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="message" className="label-text block mb-2">Message</label>
                  <textarea id="message" required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full bg-transparent border border-white/10 px-4 py-3 text-off-white focus:border-sand/50 focus:outline-none transition-colors resize-none" />
                </div>
                <button type="submit" data-cursor className="inline-flex items-center gap-3 px-8 py-4 bg-sand text-primary text-sm uppercase tracking-wider font-medium hover:bg-sand-light transition-all hover:-translate-y-0.5">
                  Send Message
                  <Send size={16} />
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
