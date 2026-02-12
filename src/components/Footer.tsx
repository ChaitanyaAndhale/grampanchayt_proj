import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useSettings } from "@/hooks/useSettings";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const Footer = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc('get_subscriber_count');
      if (!error && typeof data === 'number') {
        setSubscriberCount(data);
      }
    };
    fetchCount();
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast.error("You are already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("Subscribed successfully!");
        setEmail("");
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      toast.error(`Failed to subscribe: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { name: t.footer.links.home, href: "#home" },
    { name: t.footer.links.aboutVillage, href: "#village" },
    { name: t.footer.links.gramSabha, href: "#gram-sabha" },
    { name: t.footer.links.members, href: "#members" },
    { name: t.footer.links.gallery, href: "#gallery" },
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-gray-900 to-blue-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative gradient overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-600/5 rounded-full blur-3xl"></div>

      {/* Tri-color accent bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-green-600"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-6 text-primary-foreground">Gram Panchayat <br /><span className="text-secondary">Golegaon</span></h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              {t.footer.about}
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t.footer.quickLinks}</h3>
            <ul className="space-y-4 text-slate-400">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-secondary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t.footer.contactUs}</h3>
            <div className="space-y-4 text-slate-400">
              <a
                href="https://www.google.com/maps/place/Golegaon+Grampanchayat/@19.238443,75.4237277,19.09z/data=!4m14!1m7!3m6!1s0x3bdb39c1efa72d85:0x923c2aca5407499f!2sGolegaon+Grampanchayat!8m2!3d19.2382697!4d75.4246999!16s%2Fg%2F11j0qc6070!3m5!1s0x3bdb39c1efa72d85:0x923c2aca5407499f!8m2!3d19.2382697!4d75.4246999!16s%2Fg%2F11j0qc6070?entry=ttu&g_ep=EgoyMDI2MDIwOC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white transition-colors group"
              >
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1 group-hover:text-primary transition-colors" />
                <p>{settings.contact_address || t.footer.address}</p>
              </a>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <p>{settings.contact_phone || "+91 98765 43210"}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <p>{settings.contact_email || "office.golegaon@gov.in"}</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">{t.footer.newsletter}</h3>
            <p className="text-slate-400 mb-4">{t.footer.newsletterDesc}</p>
            {subscriberCount !== null && (
              <p className="text-sm text-secondary mb-4 font-medium">
                Join {subscriberCount} other subscribers!
              </p>
            )}
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleSubscribe}
                disabled={loading}
              >
                {loading ? "Subscribing..." : t.footer.subscribe}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              {t.footer.copyright}
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-2">
              {t.footer.developedBy} <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> {t.footer.by}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
