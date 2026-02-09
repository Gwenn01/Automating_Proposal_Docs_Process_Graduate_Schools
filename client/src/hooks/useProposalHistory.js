import { useEffect, useState } from "react";

export function useProposalHistory(proposalId) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!proposalId) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:5000/api/get-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ proposal_id: proposalId }),
        });
        const data = await res.json();
        setHistory(Array.isArray(data) ? data : []);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [proposalId]);

  return { history, loading };
}
