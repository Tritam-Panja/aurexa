import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { EASE } from "./reveal";
import { COLLECTION, LOTS } from "@/data/content";

const LINKS = [
  { label: "ART", id: "collection" },
  { label: "EXHIBITIONS", id: "exhibition" },
  { label: "ARTISTS", id: "experience" },
  { label: "AUCTIONS", id: "auction" },
  { label: "GALLERY", id: "horizontal-gallery" },
  { label: "ABOUT", id: "journal" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => {
      // Screen 1 is the pure cover hero; reveal navbar once user scrolls towards Screen 2
      const threshold = window.innerHeight * 0.35;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  const go = (id: string) => {
    setOpen(false);
    setSearchOpen(false);
    setTimeout(() => scrollToId(id), open || searchOpen ? 300 : 0);
  };

  const filteredCollection = searchQuery.trim()
    ? COLLECTION.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredLots = searchQuery.trim()
    ? LOTS.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.medium.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "translate-y-0 opacity-100 border-b border-ivory/10 bg-ink/85 py-3.5 backdrop-blur-md shadow-2xl pointer-events-auto"
            : "-translate-y-6 opacity-0 pointer-events-none py-5"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12">
          {/* Brand Logo with AUREXA / ART & SCULPTURE */}
          <button
            data-testid="nav-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex flex-col items-start text-left focus:outline-none"
          >
            <span className="font-cinzel text-lg md:text-xl font-medium tracking-[0.35em] text-ivory transition-colors duration-300 group-hover:text-champagne">
              AUREXA
            </span>
            <span className="text-[7.5px] uppercase tracking-[0.45em] text-champagne/90 font-light -mt-0.5">
              ART &amp; SCULPTURE
            </span>
          </button>

          {/* Center Navigation Links */}
          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className="group relative py-1 text-[11px] uppercase tracking-[0.3em] text-ivory/80 transition-colors duration-300 hover:text-ivory"
              >
                <span>{l.label}</span>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-champagne transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Search & Menu (matching reference design) */}
          <div className="flex items-center gap-6 md:gap-7">
            {/* Search Trigger */}
            <button
              data-testid="nav-search-btn"
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center text-ivory/80 transition-colors duration-300 hover:text-champagne focus:outline-none"
              aria-label="Search collection and exhibitions"
            >
              <Search className="h-4 w-4 md:h-[18px] md:w-[18px] stroke-[1.75]" />
            </button>

            {/* Hamburger Menu Toggle */}
            <button
              data-testid="nav-menu-btn"
              onClick={() => setOpen(true)}
              className="flex flex-col justify-center gap-[5px] p-1 text-ivory hover:text-champagne transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <span className="h-[1.5px] w-5 bg-current transition-all duration-300" />
              <span className="h-[1.5px] w-5 bg-current transition-all duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Drawer Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-ink/95 px-8 py-8 backdrop-blur-xl md:px-16 md:py-12"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-ivory/10 pb-6">
              <div className="flex flex-col">
                <span className="font-cinzel text-xl tracking-[0.35em] text-ivory">AUREXA</span>
                <span className="text-[8px] uppercase tracking-[0.45em] text-champagne">ART &amp; SCULPTURE</span>
              </div>
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border border-ivory/20 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ivory/80 transition-colors hover:border-champagne hover:text-champagne"
              >
                <X className="h-3.5 w-3.5" />
                <span>Close</span>
              </button>
            </div>

            <nav className="my-auto flex flex-col gap-3 py-6">
              {[...LINKS, { label: "PRIVATE ACCESS", id: "access" }].map((l, i) => (
                <div key={l.id} className="overflow-hidden">
                  <motion.button
                    data-testid={`mobile-nav-${l.id}`}
                    onClick={() => go(l.id)}
                    className="group flex items-center justify-between py-2 text-left font-cinzel text-3xl md:text-5xl font-light text-ivory/90 transition-colors duration-300 hover:text-champagne w-full"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i }}
                  >
                    <span>{l.label}</span>
                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-champagne" />
                  </motion.button>
                </div>
              ))}
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-ivory/10 pt-6 text-[10px] uppercase tracking-[0.4em] text-ivory/50">
              <span className="text-champagne">Private Exhibition &amp; Auction</span>
              <span>MMXXVI — By Invitation Only</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 px-6 py-8 backdrop-blur-xl md:px-20 md:py-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex items-center justify-between border-b border-ivory/20 pb-4">
                <div className="flex flex-1 items-center gap-3">
                  <Search className="h-5 w-5 text-champagne" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search artworks, sculptures, artists..."
                    className="w-full bg-transparent font-serif text-xl md:text-2xl text-ivory placeholder:text-ivory/30 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="ml-4 p-2 text-ivory/60 hover:text-ivory"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Suggestions or Results */}
              <div className="mt-8 max-h-[60vh] overflow-y-auto pr-2">
                {searchQuery.trim() === "" ? (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-champagne/80 mb-4">
                      Suggested Categories &amp; Highlights
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {["Paintings", "Marble & Sculpture", "Antiquities", "Decorative Arts", "Auctions"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSearchQuery(cat);
                          }}
                          className="border border-ivory/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-ivory/80 transition-colors hover:border-champagne hover:text-champagne"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredCollection.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.35em] text-champagne mb-3">
                          Collection Works ({filteredCollection.length})
                        </h4>
                        <div className="grid gap-3">
                          {filteredCollection.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => go("collection")}
                              className="group flex cursor-pointer items-center justify-between border-b border-ivory/5 py-2.5 transition-colors hover:text-champagne"
                            >
                              <div>
                                <p className="font-serif text-base text-ivory group-hover:text-champagne">{item.title}</p>
                                <p className="text-xs text-ivory/50">{item.origin} — {item.period}</p>
                              </div>
                              <span className="text-[9px] uppercase tracking-[0.2em] text-champagne/70 border border-champagne/30 px-2 py-0.5">
                                {item.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredLots.length > 0 && (
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.35em] text-champagne mb-3">
                          Auction Lots ({filteredLots.length})
                        </h4>
                        <div className="grid gap-3">
                          {filteredLots.map((lot, idx) => (
                            <div
                              key={idx}
                              onClick={() => go("auction")}
                              className="group flex cursor-pointer items-center justify-between border-b border-ivory/5 py-2.5 transition-colors hover:text-champagne"
                            >
                              <div>
                                <p className="font-serif text-base text-ivory group-hover:text-champagne">Lot {lot.no}: {lot.title}</p>
                                <p className="text-xs text-ivory/50">{lot.origin} • {lot.estimate}</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-champagne opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredCollection.length === 0 && filteredLots.length === 0 && (
                      <p className="text-sm text-ivory/50 italic py-6">
                        No artworks or lots matching &quot;{searchQuery}&quot;. Try searching for &quot;Paintings&quot; or &quot;Marble&quot;.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
