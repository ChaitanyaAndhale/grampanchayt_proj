import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useMembers } from "@/hooks/useMembers";
import MembersBackground from "./MembersBackground";

const MembersSection = () => {
  const { t } = useLanguage();
  const { members } = useMembers();

  const getRoleColor = (role: string) => {
    switch (role) {
      case "sarpanch":
        return "bg-primary text-white";
      case "upsarpanch":
        return "bg-secondary text-white";
      default:
        return "bg-accent text-white";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "sarpanch":
        return t.members.roles.sarpanch;
      case "upsarpanch":
        return t.members.roles.upsarpanch;
      default:
        return t.members.roles.member;
    }
  };

  return (
    <section id="members" className="py-16 md:py-20 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      <MembersBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">{t.members.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.members.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {members.length > 0 ? (
            members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-none shadow-md overflow-hidden bg-white">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="relative h-20 md:h-32 bg-gradient-to-r from-primary/80 via-orange-500/80 to-blue-600/80 group-hover:from-primary group-hover:to-blue-600 transition-all duration-500">
                      <div className="absolute -bottom-10 md:-bottom-16 left-1/2 -translate-x-1/2">
                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                          {member.photo_url ? (
                            <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl md:text-4xl font-bold text-primary">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-12 md:pt-20 pb-3 md:pb-8 px-2 md:px-6 text-center flex-grow flex flex-col justify-end">
                      <div className={`inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold mb-2 md:mb-4 ${getRoleColor(member.role)}`}>
                        {getRoleLabel(member.role)}
                      </div>

                      <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-0.5 md:mb-1 line-clamp-1">{member.name}</h3>
                      <p className="text-xs md:text-base text-muted-foreground font-medium mb-3 md:mb-6 line-clamp-1">{member.designation}</p>

                      <div className="space-y-1 md:space-y-3 mt-auto">
                        {member.contact && (
                          <a href={`tel:${member.contact}`} className="flex items-center justify-center gap-1 md:gap-2 text-[10px] md:text-sm text-gray-600 hover:text-primary transition-colors">
                            <Phone className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{member.contact}</span>
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-1 md:gap-2 text-[10px] md:text-sm text-gray-600 hover:text-primary transition-colors">
                            <Mail className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="truncate max-w-[120px] md:max-w-none">{member.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No members found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
