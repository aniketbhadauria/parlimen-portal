import { useEffect, useMemo, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { motion, useReducedMotion } from "framer-motion";
import { books, records as allRecords } from "./data.js";
import { MobileTabs, Sidebar, TopBar } from "./components/Chrome.jsx";
import { RecordDialog } from "./components/RecordDialog.jsx";
import {
  BriefingScreen,
  CouncilScreen,
  EstatesScreen,
  IstanaScreen,
  TreasuryScreen,
  Updating,
} from "./components/Screens.jsx";

function matches(record, query) {
  if (!query.trim()) return true;
  const haystack = `${record.title} ${record.place} ${record.kind} ${record.summary}`.toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export default function App() {
  const reduce = useReducedMotion();
  const [section, setSection] = useState("briefing");
  const [period, setPeriod] = useState("quarter");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const [signed, setSigned] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

  const book = books[period];

  const visibleRecords = useMemo(
    () => allRecords.filter((record) => !signed.includes(record.id)).filter((record) => matches(record, query)),
    [query, signed]
  );

  const waiting = useMemo(
    () => visibleRecords.filter((record) => record.needsSignature || record.kind === "Audience"),
    [visibleRecords]
  );

  const openRecord = useMemo(() => {
    const fromBook = allRecords.find((record) => record.id === openId);
    return fromBook || null;
  }, [openId]);

  const [customRecord, setCustomRecord] = useState(null);
  const dialogRecord = customRecord || openRecord;

  useEffect(() => {
    if (!updating) return undefined;
    const started = performance.now();
    let frame;
    const tick = (now) => {
      const next = Math.min(100, ((now - started) / 700) * 100);
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
      else {
        setUpdating(false);
        setProgress(0);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [updating]);

  function open(record) {
    if (allRecords.some((item) => item.id === record.id)) {
      setCustomRecord(null);
      setOpenId(record.id);
    } else {
      setOpenId(null);
      setCustomRecord(record);
    }
  }

  function close() {
    setOpenId(null);
    setCustomRecord(null);
  }

  function sign(id) {
    setSigned((current) => (current.includes(id) ? current : [...current, id]));
    close();
  }

  let screen = null;
  if (section === "briefing") {
        screen = (
          <BriefingScreen
            book={book}
            records={waiting}
            query={query}
            onOpen={open}
            onUpdate={() => { setProgress(0); setUpdating(true); }}
          />
        );
  } else if (section === "treasury") {
    screen = <TreasuryScreen book={book} records={waiting} query={query} onOpen={open} />;
  } else if (section === "estates") {
    screen = <EstatesScreen book={book} query={query} />;
  } else if (section === "council") {
    screen = <CouncilScreen records={visibleRecords} query={query} onOpen={open} />;
  } else {
    screen = <IstanaScreen records={allRecords} query={query} onOpen={open} />;
  }

  return (
    <Tooltip.Provider delayDuration={400}>
      <div className="flex h-dvh overflow-hidden bg-canvas p-3 sm:p-4">
        <div className="shell relative flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-panel focus:px-3 focus:py-2"
        >
          Skip to briefing
        </a>
        <Sidebar section={section} onSelect={setSection} />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <TopBar
            section={section}
            period={period}
            onPeriod={setPeriod}
            query={query}
            onQuery={setQuery}
            onUpdate={() => { setProgress(0); setUpdating(true); }}
            onPrint={() => window.print()}
          />
          <main
            id="content"
            className="mx-auto w-full max-w-6xl min-h-0 flex-1 overflow-y-auto px-5 pt-2 pb-28 sm:px-8 lg:pb-10"
          >
            {updating ? (
              <Updating progress={reduce ? 100 : progress} />
            ) : (
              <motion.div
                key={`${section}-${period}`}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {screen}
              </motion.div>
            )}
          </main>
        </div>
        <MobileTabs section={section} onSelect={setSection} />
        <RecordDialog record={dialogRecord} onClose={close} onSign={sign} />
        </div>
      </div>
    </Tooltip.Provider>
  );
}
