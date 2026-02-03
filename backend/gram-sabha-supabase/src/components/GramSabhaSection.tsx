import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchGramSabhaRecords, updateGramSabhaRecord } from "@/api/admin/gramSabha";
import { GramSabhaRecord } from "@/types/gramSabha";

const GramSabhaSection = () => {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [gramSabhaRecords, setGramSabhaRecords] = useState<GramSabhaRecord[]>([]);

  useEffect(() => {
    const loadRecords = async () => {
      const records = await fetchGramSabhaRecords();
      setGramSabhaRecords(records);
    };
    loadRecords();
  }, []);

  const groupedRecords = gramSabhaRecords.reduce((acc, record) => {
    if (!acc[record.year]) {
      acc[record.year] = [];
    }
    acc[record.year].push(record);
    return acc;
  }, {} as Record<number, GramSabhaRecord[]>);

  const years = Object.keys(groupedRecords).map(Number).sort((a, b) => b - a);

  const handleUpdateRecord = async (year: number, index: number, updatedRecord: GramSabhaRecord) => {
    await updateGramSabhaRecord(year, index, updatedRecord);
    const updatedRecords = await fetchGramSabhaRecords();
    setGramSabhaRecords(updatedRecords);
  };

  return (
    <section id="gram-sabha" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Gram Sabha Records</h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Complete records of our Gram Sabha meetings, showcasing transparent governance 
          and community participation in village development decisions.
        </p>

        <div className="space-y-4">
          {years.map((year) => (
            <Card key={year} className="gov-card">
              <CardHeader>
                <button
                  onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                  className="w-full"
                >
                  <CardTitle className="flex items-center justify-between text-accent">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Year {year}
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="gov-badge bg-primary/10 text-primary">
                        {groupedRecords[year].length} Meetings
                      </span>
                      {expandedYear === year ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </CardTitle>
                </button>
              </CardHeader>

              {expandedYear === year && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {groupedRecords[year].map((record, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-primary pl-4 py-3 bg-card/50 rounded-r-lg hover:bg-card transition-colors"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                          <div>
                            <h4 className="font-semibold text-accent">{record.date}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{record.remarks}</p>
                          </div>
                          <div className="flex gap-4">
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-secondary">
                                <Users className="w-4 h-4" />
                                <span className="font-bold">{record.membersPresent}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">Present</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Users className="w-4 h-4" />
                                <span className="font-bold">{record.membersAbsent}</span>
                              </div>
                              <div className="text-xs text-muted-foreground">Absent</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" className="hover:bg-primary hover:text-white">
            View All Historical Records
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GramSabhaSection;