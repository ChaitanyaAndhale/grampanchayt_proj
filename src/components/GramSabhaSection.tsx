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
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12"
          >
            {/* Total Meetings */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{totalMeetings}</div>
              <div className="text-white/90 text-sm font-medium">Total Meetings</div>
            </motion.div>

            {/* Average Attendance */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{avgAttendance}</div>
              <div className="text-white/90 text-sm font-medium">Avg Attendance</div>
            </motion.div>

            {/* Attendance Rate */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{attendanceRate}%</div>
              <div className="text-white/90 text-sm font-medium">Attendance Rate</div>
            </motion.div>

            {/* Most Active Year */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{mostActiveYear || "-"}</div>
              <div className="text-white/90 text-sm font-medium">Most Active Year</div>
            </motion.div>

            {/* Last Meeting */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-xl font-bold text-white mb-1">{lastMeetingDate}</div>
              <div className="text-white/90 text-sm font-medium">Last Meeting</div>
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
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by date or agenda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </div>

            {/* Year Filter */}
            <div className="relative min-w-full md:min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <select
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none bg-white cursor-pointer"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    Year {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
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
                filteredYears.map((year, index) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-none shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 relative group">
                      {/* Gradient Border Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <div className="relative bg-white m-[2px] rounded-lg">
                        <CardHeader className="p-0">
                          <button
                            onClick={() =>
                              setExpandedYear(expandedYear === year ? null : year)
                            }
                            className="w-full p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-white to-gray-50 hover:from-orange-50 hover:to-emerald-50 transition-all duration-300"
                          >
                            <CardTitle className="flex items-center gap-4 text-xl text-accent w-full sm:w-auto justify-center sm:justify-start">
                              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                                <Calendar className="w-6 h-6 text-white" />
                              </div>
                              <span className="font-bold">Year {year}</span>
                            </CardTitle>
                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                              <span className="bg-gradient-to-br from-primary to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md whitespace-nowrap">
                                {groupedRecords[year].length}{" "}
                                {t.gramSabha.meetings}
                              </span>
                              <div className="p-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-orange-100 group-hover:to-emerald-100 transition-all duration-300">
                                {expandedYear === year ? (
                                  <ChevronUp className="w-5 h-5 text-accent" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-accent" />
                                )}
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
                              transition={{ duration: 0.3 }}
                            >
                              <CardContent className="bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 border-t-2 border-gray-100">
                                <div className="space-y-4">
                                  {groupedRecords[year].map((record, index) => {
                                    const totalMembers = record.membersPresent + record.membersAbsent;
                                    const attendancePercentage = totalMembers > 0
                                      ? Math.round((record.membersPresent / totalMembers) * 100)
                                      : 0;
                                    const attendanceColor = attendancePercentage >= 75
                                      ? 'from-green-500 to-green-600'
                                      : attendancePercentage >= 50
                                        ? 'from-yellow-500 to-yellow-600'
                                        : 'from-red-500 to-red-600';

                                    return (
                                      <motion.div
                                        key={index}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-4 md:p-5 rounded-xl shadow-md border-2 border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group/card"
                                      >
                                        <div className="flex flex-col gap-4">
                                          {/* Header with Date and Attendance Bar */}
                                          <div>
                                            <div className="flex items-center gap-2 mb-3">
                                              <div className="bg-gradient-to-br from-secondary to-emerald-600 p-2 rounded-lg">
                                                <Calendar className="w-4 h-4 text-white" />
                                              </div>
                                              <h4 className="font-bold text-gray-800 text-lg">
                                                {record.date}
                                              </h4>
                                            </div>

                                            {/* Attendance Progress Bar */}
                                            <div className="mb-3">
                                              <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-semibold text-gray-600">Attendance</span>
                                                <span className="text-xs font-bold text-gray-800">{attendancePercentage}%</span>
                                              </div>
                                              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                <motion.div
                                                  initial={{ width: 0 }}
                                                  animate={{ width: `${attendancePercentage}%` }}
                                                  transition={{ duration: 0.8, delay: index * 0.1 }}
                                                  className={`h-full bg-gradient-to-r ${attendanceColor} rounded-full`}
                                                />
                                              </div>
                                            </div>

                                            {/* Agenda */}
                                            <div className="flex items-start gap-2 text-muted-foreground bg-gray-50 p-3 rounded-lg">
                                              <FileText className="w-4 h-4 mt-1 shrink-0 text-primary" />
                                              <p className="text-sm leading-relaxed">
                                                {record.remarks}
                                              </p>
                                            </div>
                                          </div>

                                          {/* Members Count */}
                                          <div className="flex gap-4 pt-3 border-t border-gray-200">
                                            <div className="flex-1 text-center bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg hover:shadow-sm transition-shadow">
                                              <div className="flex items-center justify-center gap-1 text-green-700 font-bold text-xl mb-1">
                                                <Users className="w-5 h-5" />
                                                {record.membersPresent}
                                              </div>
                                              <div className="text-xs text-green-600 font-semibold uppercase tracking-wide">
                                                {t.gramSabha.present}
                                              </div>
                                            </div>
                                            <div className="flex-1 text-center bg-gradient-to-br from-gray-50 to-slate-50 p-3 rounded-lg hover:shadow-sm transition-shadow">
                                              <div className="flex items-center justify-center gap-1 text-gray-600 font-bold text-xl mb-1">
                                                <Users className="w-5 h-5" />
                                                {record.membersAbsent}
                                              </div>
                                              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                                                {t.gramSabha.absent}
                                              </div>
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
                      </div>
                    </Card>
                  </motion.div>
                ))
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
    </section>
  );
};

export default GramSabhaSection;
