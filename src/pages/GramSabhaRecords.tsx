import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useGramSabha from "@/hooks/useGramSabha";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Search,
    Calendar,
    Users,
    FileText,
    Download,
    Filter,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const GramSabhaRecords = () => {
    const { t } = useLanguage();
    const { data: records, loading, error } = useGramSabha();
    const [searchQuery, setSearchQuery] = useState("");
    const [yearFilter, setYearFilter] = useState("all");

    // Get unique years for filter
    const years = Array.from(new Set(records.map(r => r.year))).sort((a, b) => b - a);

    // Filter records
    const filteredRecords = records.filter(record => {
        const matchesSearch =
            record.agenda.toLowerCase().includes(searchQuery.toLowerCase()) ||
            new Date(record.meeting_date).toLocaleDateString().includes(searchQuery);
        const matchesYear = yearFilter === "all" || record.year.toString() === yearFilter;

        return matchesSearch && matchesYear;
    });

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                            {t.gramSabha.title}
                        </h1>
                        <p className="text-slate-600 max-w-3xl">
                            {t.gramSabha.description}
                        </p>
                    </motion.div>

                    {/* Controls */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="Search records..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Filter className="text-slate-500 w-4 h-4" />
                            <select
                                className="bg-white border border-slate-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-40"
                                value={yearFilter}
                                onChange={(e) => setYearFilter(e.target.value)}
                            >
                                <option value="all">All Years</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Records Table */}
                    <Card className="shadow-md border-slate-200 overflow-hidden">
                        <CardContent className="p-0">
                            {loading ? (
                                <div className="p-12 text-center text-slate-500">Loading records...</div>
                            ) : filteredRecords.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-slate-50">
                                            <TableRow>
                                                <TableHead className="w-[100px]">Date</TableHead>
                                                <TableHead className="w-[100px]">Year</TableHead>
                                                <TableHead>Agenda / Subject</TableHead>
                                                <TableHead className="text-center">Attendance</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredRecords.map((record) => (
                                                <TableRow key={record.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <TableCell className="font-medium whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4 text-primary" />
                                                            {new Date(record.meeting_date).toLocaleDateString()}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{record.year}</TableCell>
                                                    <TableCell className="max-w-md">
                                                        <div className="line-clamp-2" title={record.agenda}>
                                                            {record.agenda}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-4 text-xs">
                                                            <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                                                <Users className="w-3 h-3" /> P: {record.present_count}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                                                <Users className="w-3 h-3" /> A: {record.absent_count}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {record.file_url ? (
                                                            <Button variant="outline" size="sm" asChild className="gap-2 h-8">
                                                                <a href={record.file_url} target="_blank" rel="noreferrer">
                                                                    <FileText className="w-3 h-3" />
                                                                    View PDF
                                                                </a>
                                                            </Button>
                                                        ) : (
                                                            <span className="text-slate-400 text-xs italic">No Document</span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <div className="p-12 text-center text-slate-500 bg-slate-50/50">
                                    <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                    <p>No records found matching your criteria.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default GramSabhaRecords;
