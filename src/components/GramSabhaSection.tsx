import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Calendar, Users, FileText, BarChart3, TrendingUp, Search, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import useGramSabha from "@/hooks/useGramSabha";
import { useLanguage } from "@/context/LanguageContext";
import WarliBackground from "./WarliBackground";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { data, loading, error } = useGramSabha();

  // map to local shape expected by this component
  const gramSabhaRecords: GramSabhaRecord[] = (data || []).map((m) => ({
    year: m.year,
    date: new Date(m.meeting_date).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
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

  const years = Object.keys(groupedRecords)
    .map(Number)
    .sort((a, b) => b - a);

  // Calculate statistics
  const totalMeetings = gramSabhaRecords.length;
  const totalPresent = gramSabhaRecords.reduce((sum, r) => sum + r.membersPresent, 0);
  const totalAbsent = gramSabhaRecords.reduce((sum, r) => sum + r.membersAbsent, 0);
  const avgAttendance = totalMeetings > 0 ? Math.round(totalPresent / totalMeetings) : 0;
  const attendanceRate = totalPresent + totalAbsent > 0
    ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)
    : 0;

  const mostActiveYear = years.length > 0
    ? years.reduce((max, year) =>
      groupedRecords[year].length > groupedRecords[max].length ? year : max,
      years[0]
    )
    : null;

  const lastMeetingDate = gramSabhaRecords.length > 0
    ? gramSabhaRecords[0].date
    : "-";

  // Filter records based on search and year filter
  const filteredYears = selectedYear
    ? years.filter(y => y === selectedYear)
    : years;

  const filteredRecords = searchQuery
    ? gramSabhaRecords.filter(r =>
      r.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.remarks.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : gramSabhaRecords;

  return (
    <section id="gram-sabha" className="py-20 bg-white relative overflow-hidden">
      <WarliBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-accent mb-4">
            {t.gramSabha.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.gramSabha.description}
          </p>
        </motion.div>

        {/* Statistics Dashboard */}
        {!loading && !error && gramSabhaRecords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mb-8 md:mb-12"
          >
            {/* Total Meetings */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-3 md:p-6 shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl">
                  <BarChart3 className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">{totalMeetings}</div>
              <div className="text-white/90 text-xs md:text-sm font-medium">Total Meetings</div>
            </motion.div>

            {/* Average Attendance */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 md:p-6 shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">{avgAttendance}</div>
              <div className="text-white/90 text-xs md:text-sm font-medium">Avg Attendance</div>
            </motion.div>

            {/* Attendance Rate */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 md:p-6 shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl">
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">{attendanceRate}%</div>
              <div className="text-white/90 text-xs md:text-sm font-medium">Attendance Rate</div>
            </motion.div>

            {/* Most Active Year */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-3 md:p-6 shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl">
                  <Calendar className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="text-xl md:text-3xl font-bold text-white mb-0.5 md:mb-1">{mostActiveYear || "-"}</div>
              <div className="text-white/90 text-xs md:text-sm font-medium">Most Active</div>
            </motion.div>

            {/* Last Meeting */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-3 md:p-6 shadow-md md:shadow-lg hover:shadow-xl transition-all duration-300 col-span-2 md:col-span-1"
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="bg-white/20 p-2 md:p-3 rounded-lg md:rounded-xl">
                  <Eye className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <div className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1">{lastMeetingDate}</div>
              <div className="text-white/90 text-xs md:text-sm font-medium">Last Meeting</div>
            </motion.div>
          </motion.div>
        )}

        {/* Search and Filter Controls */}
        {!loading && !error && gramSabhaRecords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row gap-3 mb-6 md:mb-8"
          >
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by date or agenda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-sm md:text-base"
              />
            </div>

            {/* Year Filter */}
            <div className="relative min-w-full md:min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 z-10" />
              <select
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
                className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none bg-white cursor-pointer text-sm md:text-base"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    Year {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none" />
            </div>
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-8">{t.gramSabha.loading}</div>
          ) : error ? (
            <div className="text-center py-8 text-destructive">{error}</div>
          ) : (
            <>
              {filteredYears.length === 0 ? (
                <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No meetings found matching your filters</p>
                </div>
              ) : (
                /* Vertical List Layout for Years */
                <div className="flex flex-col gap-3">
                  {filteredYears.map((year, index) => (
                    <motion.div
                      key={year}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="w-full"
                    >
                      <Card className={`border shadow-sm overflow-hidden bg-white transition-all duration-300 ${expandedYear === year ? 'ring-1 ring-primary/30 shadow-md' : 'hover:shadow-md'}`}>
                        <CardHeader className="p-0">
                          <button
                            onClick={() =>
                              setExpandedYear(expandedYear === year ? null : year)
                            }
                            className="w-full p-3 md:p-4 flex items-center justify-between gap-3 bg-gradient-to-r from-white to-gray-50 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-orange-100 p-2 rounded-lg shrink-0">
                                <Calendar className="w-4 h-4 text-orange-600" />
                              </div>
                              <span className="font-bold text-gray-800 text-base md:text-lg">Year {year}</span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="hidden sm:block bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">
                                {groupedRecords[year].length} {t.gramSabha.meetings}
                              </div>
                              <div className={`p-1.5 rounded-full transition-all duration-200 ${expandedYear === year ? 'bg-orange-100 text-orange-600 rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>
                          </button>
                        </CardHeader>

                        <AnimatePresence>
                          {expandedYear === year && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CardContent className="bg-gray-50/50 p-2 md:p-4 border-t border-gray-100">
                                <div className="space-y-2 md:space-y-3">
                                  {groupedRecords[year].map((record, index) => {
                                    const totalMembers = record.membersPresent + record.membersAbsent;
                                    const attendancePercentage = totalMembers > 0
                                      ? Math.round((record.membersPresent / totalMembers) * 100)
                                      : 0;

                                    return (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                                      >
                                        <div className="flex flex-col gap-2">
                                          {/* Compact Header */}
                                          <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                              <Calendar className="w-3.5 h-3.5 text-primary" />
                                              <span className="font-semibold text-sm text-gray-900">{record.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-[10px] font-bold text-gray-700">
                                              <span>{attendancePercentage}%</span>
                                            </div>
                                          </div>

                                          {/* Agenda - Compact */}
                                          <div className="text-xs text-muted-foreground line-clamp-2">
                                            {record.remarks}
                                          </div>

                                          {/* Compact Stats Row */}
                                          <div className="flex gap-2 mt-1">
                                            <div className="flex-1 bg-green-50 p-1.5 rounded flex items-center justify-center gap-1.5">
                                              <Users className="w-3 h-3 text-green-600" />
                                              <span className="text-xs font-bold text-green-700">{record.membersPresent}</span>
                                              <span className="text-[10px] text-green-600 uppercase">{t.gramSabha.present}</span>
                                            </div>
                                            <div className="flex-1 bg-gray-50 p-1.5 rounded flex items-center justify-center gap-1.5">
                                              <Users className="w-3 h-3 text-gray-500" />
                                              <span className="text-xs font-bold text-gray-600">{record.membersAbsent}</span>
                                              <span className="text-[10px] text-gray-500 uppercase">{t.gramSabha.absent}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-accent hover:text-white transition-all duration-300"
          >
            {t.gramSabha.viewAll}
          </Button>
        </div>
      </div>
    </section >
  );
};

export default GramSabhaSection;
