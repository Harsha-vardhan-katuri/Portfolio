import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Contact = () => {
  const handleContactClick = (type: string) => {
    toast.success(`Opening ${type}...`);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9676227794",
      action: "tel:+919676227794"
    },
    {
      icon: Mail,
      label: "Email",
      value: "harsha@example.com",
      action: "mailto:harsha@example.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bengaluru, Karnataka",
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com"
    }
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 gradient-text">
            Let's Connect
          </h2>
          <p className="text-center text-lg text-muted-foreground mb-16">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="glass-effect rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 glass-effect rounded-lg">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    {item.action ? (
                      <a
                        href={item.action}
                        className="text-lg font-semibold hover:text-primary transition-smooth"
                        onClick={() => handleContactClick(item.label)}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Social Links</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:scale-105 transition-smooth hover:glow-effect"
                  >
                    <link.icon className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold">{link.label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-4">Download Resume</h4>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
                  onClick={() => toast.success("Resume download started!")}
                >
                  Download CV
                </Button>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 text-center">
            <p className="text-lg mb-4">
              Looking for a dedicated firmware engineer to bring your embedded systems project to life?
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
              onClick={() => {
                window.location.href = "mailto:harsha@example.com";
                handleContactClick("Email");
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              Send me an email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
