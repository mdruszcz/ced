import { useState, useEffect } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from "recharts";
import {
  User, Target, Briefcase, Heart, ChevronRight, MapPin, Building2,
  Shield, BookOpen, Brain, Coffee, Sun, Moon, Leaf, Zap, Award,
  FileText, ExternalLink, Activity, GraduationCap, Database, BarChart3,
  Monitor, Globe, Calendar, AlertCircle, Clock, CheckCircle, Star,
  Sparkles, ArrowRight,
} from "lucide-react";

import cedricPhoto from "/cedric.jpg?url";

/* ─── Data ────────────────────────────────────────────────────────────── */

const skillsRadar = [
  { skill: "SAP MM/WM", value: 5, fullMark: 5 },
  { skill: "Excel & Data", value: 5, fullMark: 5 },
  { skill: "Marketing Digital", value: 4, fullMark: 5 },
  { skill: "Anglais", value: 4, fullMark: 5 },
  { skill: "Néerlandais", value: 2, fullMark: 5 },
  { skill: "Gestion de Stocks", value: 5, fullMark: 5 },
  { skill: "CRM", value: 4, fullMark: 5 },
];

const skillsBars = [
  { name: "SAP MM/WM", value: 5, color: "#5B8FB9" },
  { name: "Excel / Macros / TCD", value: 5, color: "#5B8FB9" },
  { name: "Gestion de Stocks", value: 5, color: "#5B8FB9" },
  { name: "Marketing Digital", value: 4, color: "#7EC8A0" },
  { name: "Google Analytics / SEO", value: 4, color: "#7EC8A0" },
  { name: "CRM / Prospection BtoB", value: 4, color: "#7EC8A0" },
  { name: "Anglais professionnel", value: 4, color: "#A8C5DA" },
  { name: "Néerlandais", value: 2, color: "#D4A88C" },
];

const timelinePhases = [
  {
    phase: 1, title: "Cadre Légal & Protection", period: "Immédiat",
    icon: Shield, color: "#5B8FB9", status: "active",
    actions: [
      "Solliciter une visite de pré-reprise (confidentielle) avec le Médecin du Travail (CP-MT)",
      "Demander un régime de mi-temps médical pour tester une reprise progressive",
      "Impliquer un représentant syndical pour les futures réunions formelles",
      "Sanctuariser le temps de repos — ne pas fixer de date butoir arbitraire",
      "S'informer sur la Réintégration 3.0 (délais légaux : 49 j. évaluation, 55 j. plan)",
    ],
  },
  {
    phase: 2, title: "Bilan & Accompagnement", period: "Mois 1-2",
    icon: Brain, color: "#7EC8A0", status: "upcoming",
    actions: [
      "Entamer un bilan de compétences externe (cabinet spécialisé région de Namur)",
      "Consulter un professionnel de la santé mentale spécialisé en burnout",
      "Travailler la « désidentification professionnelle » — revoir les standards de performance",
      "Utiliser la plateforme TRIO (INAMI) pour la communication entre acteurs médicaux",
      "Préparer un narratif positif : aligner expertise SAP/Data sur la stratégie « 5hift » d'Infrabel",
    ],
  },
  {
    phase: 3, title: "Offensive Interne Infrabel", period: "Mois 3-4",
    icon: Building2, color: "#E8B86D", status: "upcoming",
    actions: [
      "Cibler le programme « ICT Traineeship » d'Infrabel — passerelle vers Analyste Fonctionnel SAP",
      "Exiger l'inscription à l'Infrabel Academy (Your Rail Academy) dans le plan de réintégration",
      "Se positionner pour des formations en Data Visualization, Power BI, Agile/Scrum",
      "Préparer les entretiens de mobilité : argumentaire centré sur la création de valeur « 5hift »",
      "Viser les départements ICT (Analyste SAP), Procurement (SC Analyst) ou Communication",
    ],
  },
  {
    phase: 4, title: "Filet de Sécurité Externe", period: "En parallèle",
    icon: Globe, color: "#C49BBB", status: "upcoming",
    actions: [
      "Restructurer le CV : format fonctionnel centré « Gestion de la Donnée » (SAP MM/WM)",
      "Créer des alertes emploi : SAP MM Consultant, Master Data Officer, BA Supply Chain",
      "Cibler Wallonie + Bruxelles (télétravail hybride viable depuis Namur)",
      "Envisager une certification Business Data Analysis (EPHEC ou ESA Namur)",
      "Laisser les cabinets de recrutement venir à vous — profil rare en pénurie",
    ],
  },
];

const opportunities = [
  { poste: "Analyste Fonctionnel SAP", type: "Infrabel (Interne)", typeTag: "interne", avantages: "Continuité contrat, ICT Traineeship, connaissance terrain depuis 2018, mode projet, back-office", adequation: 95, detail: "Pertinence maximale. Pont entre développeurs IT et terrain. Expertise Key User SAP MM/WM légitime." },
  { poste: "Supply Chain Analyst / Acheteur Stratégique", type: "Infrabel (Interne)", typeTag: "interne", avantages: "Analyse de flux globaux, partenariats publics-privés, valorise le passé Alstom", adequation: 82, detail: "Pertinence forte. Analyse sans pression opérationnelle, manipulation de données stratégiques." },
  { poste: "Consultant Fonctionnel SAP (Supply Chain)", type: "Delaware / ARHS Group", typeTag: "externe", avantages: "Travail en mode projet, cahier des charges structurant, haute rémunération, télétravail", adequation: 88, detail: "Option la plus lucrative. Avantage d'avoir été « côté client » chez Alstom et Infrabel." },
  { poste: "SAP Business Analyst MM/WM", type: "Sibelga", typeTag: "externe", avantages: "Forte composante télétravail, entreprise publique stable, modules SAP identiques", adequation: 85, detail: "Transition douce. Environnement similaire à Infrabel avec moins de pression terrain." },
  { poste: "Master Data Specialist", type: "GSK / UCB / Pharma (Brabant Wallon)", typeTag: "externe", avantages: "Back-office calme et méthodique, idéal post-burnout, métier émergent et fondamental", adequation: 80, detail: "Garant de la qualité des données ERP. Travail minutieux valorisant SAP + Excel avancé." },
  { poste: "Business Data Analyst", type: "GE Vernova (Namur) / Resultance", typeTag: "externe", avantages: "Rapports stratégiques, tableaux de bord BI, objectifs moyen terme, proximité géographique", adequation: 75, detail: "Nécessite upskilling (Power BI, SQL) mais valorise fortement le passé Analyst Forecast." },
  { poste: "Chargé de Communication Interne", type: "Infrabel (Interne)", typeTag: "interne", avantages: "Retour aux sources marketing, connaissance authentique des métiers terrain", adequation: 65, detail: "Pertinence moyenne. Valorise le diplôme Marketing et l'expérience UCM/Logemat." },
];

const wellbeingTips = [
  { icon: Coffee, title: "Rituels du matin", desc: "Commencer chaque journée par 15 minutes sans écran. Respiration profonde, thé, lumière naturelle.", color: "#E8B86D" },
  { icon: Activity, title: "Mouvement doux", desc: "Marche de 30 min/jour en nature. Pas de performance, juste le plaisir de bouger.", color: "#7EC8A0" },
  { icon: Moon, title: "Hygiène du sommeil", desc: "Horaires réguliers. Pas d'écran 1h avant le coucher. Le repos est le fondement de la reconstruction.", color: "#5B8FB9" },
  { icon: Leaf, title: "Désidentification professionnelle", desc: "Vous n'êtes pas votre productivité. Réduisez vos standards les premiers mois. La priorité : préserver votre énergie.", color: "#C49BBB" },
  { icon: BookOpen, title: "Journal de bord", desc: "Notez chaque jour 3 petites victoires et 1 moment de gratitude. Recâbler le cerveau vers le positif.", color: "#7EC8A0" },
  { icon: Sun, title: "Limites saines", desc: "Apprendre à dire non sans culpabilité. Le mi-temps médical est un droit, pas un privilège.", color: "#E8B86D" },
];

const mantras = [
  "Ce n'est pas une crise de compétences, c'est une inadéquation situationnelle.",
  "Votre profil hybride SAP + Marketing est classifié « profil rare » en Belgique.",
  "Le burnout n'est pas une faiblesse — c'est le signal que vos talents méritent mieux.",
  "La reprise est un marathon, pas un sprint. Chaque petit pas compte.",
  "Vous avez 18 ans d'expertise. Le marché est en pénurie. Vous avez le pouvoir.",
];

/* ─── Small UI pieces ─────────────────────────────────────────────────── */

const tabs = [
  { id: "profil", label: "Profil", icon: User },
  { id: "strategie", label: "Stratégie", icon: Target },
  { id: "opportunites", label: "Opportunités", icon: Briefcase },
  { id: "bienetre", label: "Bien-être", icon: Heart },
];

function AdequationBar({ value }) {
  const color = value >= 85 ? "#5B8FB9" : value >= 75 ? "#7EC8A0" : value >= 65 ? "#E8B86D" : "#D4A88C";
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{value}%</span>
    </div>
  );
}

function TypeBadge({ type }) {
  const isInterne = type === "interne";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${isInterne ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}>
      {isInterne ? <Building2 size={11} /> : <Globe size={11} />}
      {isInterne ? "Interne" : "Externe"}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  APP                                                                   */
/* ═══════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [activeTab, setActiveTab] = useState("profil");
  const [mantraIdx, setMantraIdx] = useState(0);
  const [expandedOpp, setExpandedOpp] = useState(null);
  const [expandedPhase, setExpandedPhase] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const t = setInterval(() => setMantraIdx((i) => (i + 1) % mantras.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* ── card wrapper ── */
  const Card = ({ children, className = "" }) => (
    <div className={`rounded-2xl p-5 sm:p-6 bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg,#f0f5f8 0%,#e8efe6 40%,#f5f0eb 100%)" }}>
      {/* noise */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* ── mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#5B8FB9,#7EC8A0)" }}>
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-semibold text-slate-700 text-sm tracking-wide">COACHING DASHBOARD</span>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="space-y-1"><div className="w-5 h-0.5 bg-slate-500 rounded" /><div className="w-4 h-0.5 bg-slate-500 rounded" /><div className="w-5 h-0.5 bg-slate-500 rounded" /></div>
          </button>
        </div>
      </div>

      {/* overlay */}
      {sidebarOpen && <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}

      {/* ── sidebar ── */}
      <aside className={`fixed top-0 left-0 h-full z-50 w-72 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col backdrop-blur-2xl bg-white/80 border-r border-slate-200/50 shadow-xl shadow-slate-200/20">
          {/* logo */}
          <div className="p-6 pt-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#5B8FB9,#7EC8A0)" }}>
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Coaching</div>
                <div className="text-sm font-bold text-slate-700 -mt-0.5 tracking-wide">Dashboard</div>
              </div>
            </div>

            {/* photo + name */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 shadow-lg shadow-slate-300/30 ring-2 ring-white">
                <img src={cedricPhoto} alt="Cédric Charlier" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-base font-bold text-slate-800" style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}>Cédric Charlier</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Sambreville (Namur) · Infrabel</p>
              <div className="flex gap-1.5 mt-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600">Logistique</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600">Data</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-600">Marketing</span>
              </div>
            </div>
          </div>

          {/* nav */}
          <nav className="flex-1 px-4">
            <div className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase px-3 mb-2">Navigation</div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 text-left ${isActive ? "bg-white shadow-md shadow-slate-200/50 text-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-gradient-to-br from-blue-100 to-emerald-50" : "bg-slate-100/50"}`}>
                    <Icon size={16} className={isActive ? "text-blue-600" : "text-slate-400"} />
                  </div>
                  <span className="text-sm font-medium">{tab.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto text-slate-300" />}
                </button>
              );
            })}
          </nav>

          {/* mantra card */}
          <div className="p-4">
            <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg,#5B8FB9 0%,#7EC8A0 100%)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Leaf size={14} className="text-white/80" />
                <span className="text-[10px] font-bold tracking-wider text-white/80 uppercase">Rappel du jour</span>
              </div>
              <p className="text-white/95 text-xs leading-relaxed transition-opacity duration-500" key={mantraIdx}>
                &ldquo;{mantras[mantraIdx]}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── main ── */}
      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
        <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

          {/* ═══ PROFIL ═══ */}
          {activeTab === "profil" && (
            <div className="space-y-6">
              {/* hero */}
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-[0.15em] text-emerald-600 uppercase">Profil en reconstruction</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2" style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}>Cédric Charlier</h1>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      18+ ans d'expérience hybride · Double casquette <strong className="text-blue-600">Logistique / Data</strong> &amp; <strong className="text-emerald-600">Marketing Digital</strong>.
                      Expert SAP MM/WM avec une vision transversale « end-to-end » allant de la chaîne d'approvisionnement à l'interface client.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[{ icon: MapPin, text: "Sambreville (Namur)" }, { icon: Building2, text: "Infrabel depuis 2018" }, { icon: GraduationCap, text: "Bachelor Marketing" }].map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs">
                          <item.icon size={12} className="text-slate-400" />{item.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:w-36">
                    {[{ value: "18+", label: "Ans d'exp.", color: "#5B8FB9" }, { value: "5/5", label: "SAP Expert", color: "#7EC8A0" }, { value: "Rare", label: "Profil marché", color: "#E8B86D" }].map((m, i) => (
                      <div key={i} className="rounded-xl p-3 text-center bg-white border border-slate-100">
                        <div className="text-lg font-bold" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-[10px] text-slate-400 font-medium">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* double casquette */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Database, iconColor: "text-blue-600", bgColor: "bg-blue-50", title: "Axe Logistique & Data", desc: "Socle industriel forgé chez Alstom (ordonnancement 150 pers.), EHA, B&C Coton, puis consolidé chez Infrabel depuis 2018 (stocks ferroviaires critiques).", items: ["SAP MM/WM · Key User depuis 2009", "Excel avancé · TCD, Macros, Automatisation", "Analyse prévisionnelle · Commandes & Stocks", "Logiciel VARY · Planning & CRM"], checkColor: "text-blue-400" },
                  { icon: BarChart3, iconColor: "text-emerald-600", bgColor: "bg-emerald-50", title: "Axe Marketing & Communication", desc: "Diplômé en Marketing (2012). Expérience complète chez Logemat (SEO, AdWords, événementiel), UCM (salon 1000 participants) et Alstom (benchmarking).", items: ["Google Analytics & AdWords · Campagnes SEO/SEA", "Organisation événementielle · Portes ouvertes, salons", "Supports visuels · Logo, site web, cartes de visite", "Analyse concurrentielle · Benchmarking industriel"], checkColor: "text-emerald-400" },
                ].map((col, ci) => (
                  <Card key={ci}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${col.bgColor} flex items-center justify-center`}><col.icon size={16} className={col.iconColor} /></div>
                      <h3 className="font-bold text-slate-700 text-sm">{col.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{col.desc}</p>
                    <div className="space-y-1.5">
                      {col.items.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle size={12} className={`${col.checkColor} flex-shrink-0`} /><span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              {/* charts */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <h3 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2"><Activity size={14} className="text-blue-500" />Radar de Compétences</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <RadarChart data={skillsRadar} cx="50%" cy="50%" outerRadius="72%">
                      <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "#64748b" }} />
                      <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 9, fill: "#94a3b8" }} />
                      <Radar name="Compétences" dataKey="value" stroke="#5B8FB9" fill="#5B8FB9" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </Card>
                <Card>
                  <h3 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2"><BarChart3 size={14} className="text-emerald-500" />Niveaux Détaillés</h3>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={skillsBars} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                      <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10, fill: "#64748b" }} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14}>
                        {skillsBars.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* career timeline */}
              <Card>
                <h3 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2"><Clock size={14} className="text-slate-400" />Parcours Professionnel</h3>
                <div className="space-y-3">
                  {[
                    { year: "2006–08", role: "Assistant Manager", company: "CD Mobile Electro", type: "ops" },
                    { year: "2008", role: "Analyst Forecast", company: "B&C Coton Group", type: "data" },
                    { year: "2008–09", role: "Material Planner", company: "EHA", type: "data" },
                    { year: "2009–12", role: "Agent d'Ordonnancement + Asst. Marketing", company: "Alstom Transport", type: "both" },
                    { year: "2013", role: "Conseiller Communication + Qualité", company: "UCM / ORES", type: "mktg" },
                    { year: "2014–17", role: "Employé Marketing", company: "Logemat", type: "mktg" },
                    { year: "2018–now", role: "Gestionnaire Stocks & Commandes", company: "Infrabel", type: "data" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-slate-400 w-16 flex-shrink-0 text-right">{item.year}</span>
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.type === "data" ? "bg-blue-400" : item.type === "mktg" ? "bg-emerald-400" : item.type === "both" ? "bg-amber-400" : "bg-slate-300"}`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-slate-700">{item.role}</span>
                        <span className="text-xs text-slate-400 ml-1.5">— {item.company}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4 pt-3 border-t border-slate-100">
                  {[{ color: "bg-blue-400", label: "Logistique / Data" }, { color: "bg-emerald-400", label: "Marketing" }, { color: "bg-amber-400", label: "Hybride" }].map((l, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500"><div className={`w-2 h-2 rounded-full ${l.color}`} />{l.label}</div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ═══ STRATÉGIE ═══ */}
          {activeTab === "strategie" && (
            <div className="space-y-6">
              <Card className="!p-6 sm:!p-8">
                <div className="flex items-center gap-2 mb-1"><Target size={18} className="text-blue-500" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800" style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}>Plan d'Attaque en 4 Phases</h2>
                </div>
                <p className="text-sm text-slate-500 mb-6">Une stratégie séquencée et protectrice, alignée sur le cadre légal belge (Réintégration 3.0) et la stratégie « 5hift » d'Infrabel.</p>

                <div className="space-y-3">
                  {timelinePhases.map((phase, idx) => {
                    const Icon = phase.icon;
                    const isExpanded = expandedPhase === idx;
                    return (
                      <button key={idx} onClick={() => setExpandedPhase(isExpanded ? -1 : idx)} className="w-full text-left">
                        <div className={`rounded-xl p-4 transition-all duration-300 ${isExpanded ? "bg-white shadow-lg shadow-slate-200/50 border border-slate-200/80" : "bg-white/40 border border-transparent hover:bg-white/70 hover:border-slate-200/50"}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${phase.color}15` }}>
                              <Icon size={18} style={{ color: phase.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: phase.color }}>Phase {phase.phase}</span>
                                <span className="text-[10px] text-slate-400">·</span>
                                <span className="text-[10px] text-slate-400 font-medium">{phase.period}</span>
                                {phase.status === "active" && (
                                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[9px] font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />En cours
                                  </span>
                                )}
                              </div>
                              <h3 className="font-bold text-slate-700 text-sm">{phase.title}</h3>
                            </div>
                            <ChevronRight size={16} className={`text-slate-300 transition-transform duration-200 flex-shrink-0 ${isExpanded ? "rotate-90" : ""}`} />
                          </div>
                          {isExpanded && (
                            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                              {phase.actions.map((action, ai) => (
                                <div key={ai} className="flex items-start gap-2.5">
                                  <div className="w-5 h-5 rounded-md flex items-center justify-center mt-0.5 flex-shrink-0" style={{ backgroundColor: `${phase.color}15` }}>
                                    <span className="text-[9px] font-bold" style={{ color: phase.color }}>{ai + 1}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed">{action}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* legal mini */}
              <Card>
                <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2"><FileText size={14} className="text-slate-400" />Cadre Légal : Trajet de Réintégration 3.0</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { step: "1", title: "Visite pré-reprise", desc: "Confidentiel avec CP-MT", color: "#5B8FB9" },
                    { step: "2", title: "Démarrage formel", desc: "Avec soutien syndical", color: "#7EC8A0" },
                    { step: "3", title: "Évaluation", desc: "Max 49 jours", color: "#E8B86D" },
                    { step: "4", title: "Plan réintégration", desc: "55 jours pour Infrabel", color: "#C49BBB" },
                    { step: "5", title: "Exécution", desc: "Mi-temps médical", color: "#5B8FB9" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-xl p-3 bg-white/70 border border-slate-100 text-center">
                      <div className="w-7 h-7 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${s.color}15` }}>
                        <span className="text-xs font-bold" style={{ color: s.color }}>{s.step}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-700 mb-0.5">{s.title}</div>
                      <div className="text-[10px] text-slate-400">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* key insight */}
              <div className="rounded-2xl p-5 border-l-4 bg-blue-50/50 border-blue-300">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-700 text-sm mb-1">Point stratégique clé</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Cadrez votre demande non comme une fuite due au burnout, mais comme une volonté d'aligner votre expertise analytique (SAP/Data) sur la stratégie de numérisation « 5hift » d'Infrabel. Vous êtes un Key User terrain qui peut concevoir les solutions de demain.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══ OPPORTUNITÉS ═══ */}
          {activeTab === "opportunites" && (
            <div className="space-y-6">
              <Card className="!p-6 sm:!p-8">
                <div className="flex items-center gap-2 mb-1"><Briefcase size={18} className="text-emerald-500" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800" style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}>Cartographie des Opportunités</h2>
                </div>
                <p className="text-sm text-slate-500 mb-6">Mobilité interne prioritaire + filet de sécurité externe. Le marché belge est en pénurie critique de votre profil.</p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[{ value: "3", label: "Pistes internes", icon: Building2, color: "#5B8FB9" }, { value: "4", label: "Pistes externes", icon: Globe, color: "#7EC8A0" }, { value: "95%", label: "Top adéquation", icon: Star, color: "#E8B86D" }].map((s, i) => (
                    <div key={i} className="rounded-xl p-3 bg-white/70 border border-slate-100 text-center">
                      <s.icon size={16} className="mx-auto mb-1" style={{ color: s.color }} />
                      <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-[10px] text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {opportunities.map((opp, idx) => (
                    <button key={idx} onClick={() => setExpandedOpp(expandedOpp === idx ? null : idx)}
                      className={`w-full text-left rounded-xl p-4 transition-all duration-200 ${expandedOpp === idx ? "bg-white shadow-md border border-slate-200/80" : "bg-white/40 hover:bg-white/70 border border-transparent hover:border-slate-200/50"}`}>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-sm text-slate-800">{opp.poste}</span>
                            <TypeBadge type={opp.typeTag} />
                          </div>
                          <span className="text-xs text-slate-500">{opp.type}</span>
                        </div>
                        <div className="flex-shrink-0"><AdequationBar value={opp.adequation} /></div>
                        <ChevronRight size={14} className={`text-slate-300 transition-transform flex-shrink-0 ${expandedOpp === idx ? "rotate-90" : ""}`} />
                      </div>
                      {expandedOpp === idx && (
                        <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                          <div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avantages post-burnout</span><p className="text-xs text-slate-600 mt-0.5">{opp.avantages}</p></div>
                          <div><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Analyse</span><p className="text-xs text-slate-600 mt-0.5">{opp.detail}</p></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </Card>

              {/* employers */}
              <Card>
                <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2"><Zap size={14} className="text-amber-500" />Employeurs à surveiller</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { name: "Delaware", tag: "SAP Consultant", color: "#5B8FB9" },
                    { name: "Sibelga", tag: "SAP MM/WM", color: "#7EC8A0" },
                    { name: "ARHS Group", tag: "Namur", color: "#E8B86D" },
                    { name: "GE Vernova", tag: "SC Analyst Namur", color: "#C49BBB" },
                    { name: "GSK / UCB", tag: "Master Data", color: "#5B8FB9" },
                    { name: "Resultance", tag: "BA Senior Namur", color: "#7EC8A0" },
                    { name: "Easi", tag: "Great Place to Work", color: "#E8B86D" },
                    { name: "Bpost", tag: "E-commerce", color: "#C49BBB" },
                  ].map((e, i) => (
                    <div key={i} className="rounded-lg p-3 bg-white/70 border border-slate-100">
                      <div className="text-sm font-semibold text-slate-700">{e.name}</div>
                      <div className="text-[10px] font-medium mt-0.5" style={{ color: e.color }}>{e.tag}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* upskilling */}
              <Card>
                <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2"><GraduationCap size={14} className="text-blue-500" />Pistes de formation (Upskilling)</h3>
                <div className="grid sm:grid-cols-3 gap-2">
                  {[
                    { title: "Business Data Analysis", org: "EPHEC / ESA Namur", desc: "Bachelier de spécialisation pour adultes — Power BI, SQL, IA" },
                    { title: "Infrabel Academy", org: "Your Rail Academy", desc: "Formations internes BI, gestion de projet IT, Agile/Scrum" },
                    { title: "Marketing Digital 360°", org: "Technofutur TIC", desc: "Mise à niveau IA générative, automatisation, privacy" },
                  ].map((f, i) => (
                    <div key={i} className="rounded-xl p-4 bg-white/70 border border-slate-100">
                      <div className="text-sm font-semibold text-slate-700 mb-0.5">{f.title}</div>
                      <div className="text-[10px] font-medium text-blue-500 mb-2">{f.org}</div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ═══ BIEN-ÊTRE ═══ */}
          {activeTab === "bienetre" && (
            <div className="space-y-6">
              <Card className="!p-6 sm:!p-8">
                <div className="flex items-center gap-2 mb-1"><Heart size={18} className="text-rose-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800" style={{ fontFamily: "'DM Serif Display',Georgia,serif" }}>Espace Bien-être</h2>
                </div>
                <p className="text-sm text-slate-500 mb-6">La reconstruction post-burnout est un marathon, pas un sprint. Votre priorité n°1 : préserver votre énergie adaptative.</p>

                {/* rotating mantra */}
                <div className="rounded-xl p-6 mb-6 text-center" style={{ background: "linear-gradient(135deg,#5B8FB915,#7EC8A015)" }}>
                  <Sparkles size={20} className="mx-auto mb-2 text-blue-400" />
                  <p className="text-sm font-medium text-slate-700 italic transition-opacity duration-500 max-w-md mx-auto" key={mantraIdx}>&ldquo;{mantras[mantraIdx]}&rdquo;</p>
                  <div className="flex justify-center gap-1 mt-3">
                    {mantras.map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === mantraIdx ? "bg-blue-400" : "bg-slate-200"}`} />)}
                  </div>
                </div>

                {/* tips grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {wellbeingTips.map((tip, i) => {
                    const Icon = tip.icon;
                    return (
                      <div key={i} className="rounded-xl p-4 bg-white/70 border border-slate-100 hover:shadow-md hover:border-slate-200/50 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${tip.color}15` }}>
                            <Icon size={16} style={{ color: tip.color }} />
                          </div>
                          <h4 className="font-semibold text-sm text-slate-700">{tip.title}</h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* burnout insight */}
              <Card>
                <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2"><Brain size={14} className="text-purple-400" />Comprendre votre burnout</h3>
                <div className="space-y-3">
                  {[
                    { bg: "bg-amber-50/50", border: "border-amber-200/50", titleColor: "text-amber-700", title: "Diagnostic : Dissonance cognitive", text: "Votre appétence naturelle pour la création, l'analyse et la communication est en conflit profond avec la réalité opérationnelle répétitive de la gestion de stocks. Ce décalage entre vos aspirations et votre quotidien a généré la perte de sens — facteur central de l'épuisement." },
                    { bg: "bg-emerald-50/50", border: "border-emerald-200/50", titleColor: "text-emerald-700", title: "Ce n'est PAS une crise de compétences", text: "Vos notes de 5/5 en maîtrise d'outils le prouvent. Le burnout frappe de manière disproportionnée les profils fortement investis et perfectionnistes. La solution n'est pas de travailler plus, mais de travailler dans un contexte qui correspond à votre potentiel analytique et stratégique." },
                    { bg: "bg-blue-50/50", border: "border-blue-200/50", titleColor: "text-blue-700", title: "L'objectif : du front-office au back-office", text: "Passer d'un rôle de « première ligne » (gestion d'urgences logistiques) à un rôle analytique « back-office » (conception, planification, mode projet). C'est la clé pour transformer cette rupture en accélérateur de carrière." },
                  ].map((c, i) => (
                    <div key={i} className={`rounded-xl p-4 ${c.bg} border ${c.border}`}>
                      <h4 className={`text-xs font-bold ${c.titleColor} mb-1`}>{c.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* inspirational */}
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <div className="h-40 flex items-center justify-center" style={{ background: "linear-gradient(135deg,#5B8FB920,#7EC8A020,#E8B86D20)" }}>
                  <div className="text-center">
                    <Sun size={32} className="mx-auto mb-2 text-amber-400/60" />
                    <p className="text-sm font-medium text-slate-500 italic">&ldquo;Chaque expert était autrefois un débutant.<br />Chaque professionnel a un jour commencé par décider.&rdquo;</p>
                  </div>
                </div>
              </div>

              {/* resources */}
              <Card>
                <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2"><BookOpen size={14} className="text-blue-500" />Ressources utiles</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { title: "INAMI – Réinsertion", desc: "Plateforme TRIO et reprise progressive", url: "inami.fgov.be" },
                    { title: "Cohezio – Réintégration 3.0", desc: "Guide complet pour les travailleurs", url: "cohezio.be" },
                    { title: "Infrabel Jobs – ICT Traineeship", desc: "Programme de reconversion interne", url: "jobs.infrabel.be" },
                    { title: "Le Forem – Métiers en pénurie", desc: "Liste officielle 2025-2026", url: "leforem.be" },
                    { title: "ESA Namur – Business Data Analysis", desc: "Formation adultes certifiante", url: "esa-namur.be" },
                    { title: "Je me sens bien au travail", desc: "Trajet de réintégration SPF Emploi", url: "jemesensbienautravail.be" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg p-3 bg-white/70 border border-slate-100">
                      <ExternalLink size={14} className="text-blue-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-700">{r.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
