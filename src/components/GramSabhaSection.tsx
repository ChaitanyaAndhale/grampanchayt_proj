import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Calendar, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import useGramSabha from '@/hooks/useGramSabha';
import { useLanguage } from "@/context/LanguageContext";

interface GramSabhaRecord {
  year: number;
  date: string;
  membersPresent: number;
  membersAbsent: number;
  remarks: string;
}

const GramSabhaSection = () => {
  const { t } = useLanguage();
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const { data, loading, error } = useGramSabha();

  // map to local shape expected by this component
  const gramSabhaRecords: GramSabhaRecord[] = (data || []).map((m) => ({
    year: m.year,
    date: new Date(m.meeting_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }),
    membersPresent: m.present_count,
    membersAbsent: m.absent_count,
    remarks: m.agenda,
  }));

  const groupedRecords = gramSabhaRecords.reduce((acc, record) => {
    if (!acc[record.year]) {
      acc[record.year] = [];
    }
    acc[record.year].push(record);
    return acc;
  }, {} as Record<number, GramSabhaRecord[]>);

  const years = Object.keys(groupedRecords).map(Number).sort((a, b) => b - a);

  return (
    <section id="gram-sabha" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">{t.gramSabha.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.gramSabha.description}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-8">{t.gramSabha.loading}</div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">{error}</div>
          ) : (
            <>
              {years.map((year, index) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-none shadow-md overflow-hidden">
                    <CardHeader className="p-0">
                      <button
                        onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                        className="w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                      >
                        <CardTitle className="flex items-center gap-4 text-xl text-primary">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                          <span>Year {year}</span>
                        </CardTitle>
                        <div className="flex items-center gap-4">
                          <span className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {groupedRecords[year].length} {t.gramSabha.meetings}
                          </span>
                          {expandedYear === year ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                    </CardHeader>

                    <AnimatePresence>
                      {expandedYear === year && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="bg-gray-50 p-6 border-t">
                            <div className="space-y-4">
                              {groupedRecords[year].map((record, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-primary/30 transition-colors"
                                >
                                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-secondary" />
                                        <h4 className="font-bold text-gray-800">{record.date}</h4>
                                      </div>
                                      <div className="flex items-start gap-2 text-muted-foreground">
                                        <FileText className="w-4 h-4 mt-1 shrink-0" />
                                        <p className="text-sm">{record.remarks}</p>
                                      </div>
                                    </div>

                                    <div className="flex gap-6 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                                      <div className="text-center">
                                        <div className="flex items-center gap-1 text-green-600 font-bold text-lg">
                                          <Users className="w-5 h-5" />
                                          {record.membersPresent}
                                        </div>
                                        <div className="text-xs text-muted-foreground font-medium">{t.gramSabha.present}</div>
                                      </div>
                                      <div className="text-center">
                                        <div className="flex items-center gap-1 text-red-500 font-bold text-lg">
                                          <Users className="w-5 h-5" />
                                          {record.membersAbsent}
                                        </div>
                                        <div className="text-xs text-muted-foreground font-medium">{t.gramSabha.absent}</div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-white transition-all duration-300">
            {t.gramSabha.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GramSabhaSection;
