import { useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Send, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ScrollSection } from "@/components/ScrollSection";
import { toast } from "sonner";
import { SOCIAL_LINKS } from "@/lib/links";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 9676227794", action: "tel:+919676227794" },
    { icon: Mail, label: "Email", value: "harsha@example.com", action: "mailto:harsha@example.com" },
    { icon: MapPin, label: "Location", value: "Bengaluru, Karnataka", action: null },
  ];

  return (
    <ScrollSection id="contact" height="220vh">
      {() => (
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Ambient glow behind section */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 50% 40% at 50% 50%, hsl(199 89% 48% / 0.04) 0%, transparent 70%)",
              }}
            />

            <div className="mb-12 text-center relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-display gradient-text-shimmer mb-4"
              >
                Let's Connect
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0}}
                className="text-lg text-muted-foreground max-w-lg mx-auto"
              >
                Always open to discussing new projects, creative ideas, or opportunities.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 relative z-10">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8"
              >
                <h3 className="text-xl font-bold font-display mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white/[0.03] backdrop-blur-md border-white/[0.08] focus:border-primary/50 h-12 rounded-xl placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-white/[0.03] backdrop-blur-md border-white/[0.08] focus:border-primary/50 h-12 rounded-xl placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="bg-white/[0.03] backdrop-blur-md border-white/[0.08] focus:border-primary/50 rounded-xl resize-none placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </motion.div>

              {/* Contact Info + Socials */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-card p-8 space-y-5"
                >
                  <h3 className="text-xl font-bold font-display">Contact Info</h3>
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="p-2.5 glass-card rounded-xl flex-shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        {item.action ? (
                          <a href={item.action} className="text-sm font-medium hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0}}
                  className="glass-card p-8"
                >
                  <h3 className="text-xl font-bold font-display mb-4">Social Links</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Github, label: "GitHub", url: SOCIAL_LINKS.github },
                      { icon: Linkedin, label: "LinkedIn", url: SOCIAL_LINKS.linkedin },
                      { icon: FileText, label: "Resume", url: SOCIAL_LINKS.resumeView },
                    ].map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3.5 glass-card-hover rounded-xl"
                      >
                        <link.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium text-sm">{link.label}</span>
                      </a>
                    ))}
                  </div>
                  <div className="mt-5 pt-5 border-t border-border/30">
                    <Button
                      asChild
                      className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl"
                    >
                      <a
                        href={SOCIAL_LINKS.resumeDownload}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => toast.success("Resume download started!")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download CV
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* CTA with glow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-10 text-center relative overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(199 89% 48% / 0.06) 0%, transparent 60%)" }}
              />
              <p className="text-lg mb-6 text-foreground/75 relative z-10">
                Looking for a dedicated firmware engineer to bring your embedded systems project to life?
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow-pulse relative z-10 rounded-xl"
                onClick={() => window.location.href = "mailto:harsha@example.com"}
              >
                <Mail className="mr-2 h-5 w-5" />
                Send me an email
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </ScrollSection>
  );
};
