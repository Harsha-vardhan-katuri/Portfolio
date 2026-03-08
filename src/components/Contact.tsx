import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const Contact = () => {
  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 9676227794", action: "tel:+919676227794" },
    { icon: Mail, label: "Email", value: "harsha@example.com", action: "mailto:harsha@example.com" },
    { icon: MapPin, label: "Location", value: "Bengaluru, Karnataka", action: null },
  ];

  return (
    <section id="contact" className="relative py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-display gradient-text-shimmer mb-4"
            >
              Let's Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Always open to discussing new projects, creative ideas, or opportunities.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card p-8 space-y-6"
            >
              <h3 className="text-xl font-bold font-display">Get In Touch</h3>
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2.5 glass-card rounded-xl">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    {item.action ? (
                      <a href={item.action} className="text-sm font-semibold hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-bold font-display mb-6">Social Links</h3>
              <div className="space-y-3">
                {[
                  { icon: Github, label: "GitHub", url: "https://github.com" },
                  { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com" },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass-card-hover rounded-xl"
                  >
                    <link.icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border/50">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => toast.success("Resume download started!")}
                >
                  Download CV
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-10 text-center"
            style={{ boxShadow: "0 0 80px hsl(199 89% 48% / 0.08)" }}
          >
            <p className="text-lg mb-6 text-foreground/80">
              Looking for a dedicated firmware engineer to bring your embedded systems project to life?
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground animate-glow-pulse"
              onClick={() => window.location.href = "mailto:harsha@example.com"}
            >
              <Mail className="mr-2 h-5 w-5" />
              Send me an email
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
